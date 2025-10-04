const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class AdotanteController {
  async list(req, res) {
    try {
      const adotantes = await prisma.adotante.findMany({});

      res.json(adotantes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao listar adotantes" });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const adotante = await prisma.adotante.findUnique({ where: { id: Number(id) } });
      if (!adotante) {
        return res.status(404).json({ error: "Adotante não encontrado" });
      }
      
      res.json(adotante);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao buscar adotante" });
    }
  }

  async create(req, res) {
    try {
      const { nome, email, telefone, endereco } = req.body;

      const adotante = await prisma.adotante.create({
        data: {
          nome,
          email,
          telefone,
          endereco
        }
      });

      res.status(201).json(adotante);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao criar adotante" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, telefone, endereco } = req.body;
      const adotanteExistente = await prisma.adotante.findUnique({ where: { id: Number(id) } });

      if (!adotanteExistente) {
        return res.status(404).json({ error: "Adotante não encontrado" });
      }

      const adotante = await prisma.adotante.update({
        where: { id: Number(id) },
        data: { nome, email, telefone, endereco }
      });

      res.json(adotante);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao atualizar adotante" });
    }
  }

  async remove(req, res) {
    try {
      const { id } = req.params;
      const adotanteExistente = await prisma.adotante.findUnique({ where: { id: Number(id) } });
      
      if (!adotanteExistente) {
        return res.status(404).json({ error: "Adotante não encontrado" });
      }

      await prisma.adotante.delete({ where: { id: Number(id) } });

      res.status(204).end();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao deletar adotante" });
    }
  }
}

module.exports = new AdotanteController();