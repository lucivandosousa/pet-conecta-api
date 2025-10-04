const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class PetController {
  async list(req, res) {
    try {
      const pets = await prisma.pet.findMany({});

      res.json(pets);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao listar pets" });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const pet = await prisma.pet.findUnique({ where: { id: Number(id) } });

      if (!pet) {
        return res.status(404).json({ error: "Pet não encontrado" });
      }

      res.json(pet);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao buscar pet" });
    }
  }

  async create(req, res) {
    try {
      const { nome, especie, dataNascimento, descricao } = req.body;
      const fotoUrl = req.file ? `/uploads/${req.file.filename}` : null;

      const pet = await prisma.pet.create({
        data: {
          nome,
          especie,
          dataNascimento: dataNascimento ? new Date(dataNascimento) : null,
          descricao,
          fotoUrl
        }
      });

      res.status(201).json(pet);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao criar pet" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, especie, dataNascimento, descricao, status } = req.body;
      const fotoUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

      const data = { nome, especie, descricao, status };
      if (dataNascimento) data.dataNascimento = new Date(dataNascimento);
      if (fotoUrl) data.fotoUrl = fotoUrl;

      const pet = await prisma.pet.update({
        where: { id: Number(id) },
        data
      });

      res.json(pet);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao atualizar pet" });
    }
  }

  async remove(req, res) {
    try {
      const { id } = req.params;

      await prisma.pet.delete({ where: { id: Number(id) } });

      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao deletar pet" });
    }
  }
}

module.exports = new PetController();
