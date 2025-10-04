const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class AdocaoController {
  async create(req, res) {
    try {
      const { petId, adotanteId, dataAdocao } = req.body;

      const pet = await prisma.pet.findUnique({
        where: { id: Number(petId) },
      });

      if (!pet) {
        return res.status(404).json({ error: "Pet não encontrado" });
      }

      if (pet.status === "adotado") {
        return res.status(400).json({ error: "Pet já adotado" });
      }

      const adotante = await prisma.adotante.findUnique({
        where: { id: Number(adotanteId) },
      });

      if (!adotante) {
        return res.status(404).json({ error: "Adotante não encontrado" });
      }

      const adocao = await prisma.adocao.create({
        data: {
          petId: Number(petId),
          adotanteId: Number(adotanteId),
          dataAdocao: dataAdocao ? new Date(dataAdocao) : new Date()
        }
      });

      try {
        await prisma.pet.update({
          where: { id: Number(petId) },
          data: { status: "adotado" },
        });

        return res.status(201).json(adocao);
      } catch (updateError) {
        await prisma.adocao.delete({
          where: { id: adocao.id },
        });

        console.error("Erro ao atualizar o pet, rollback executado:", updateError);
        return res.status(500).json({
          error: "Erro ao atualizar status do pet. Adoção revertida.",
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao registrar adoção" });
    }
  }

  async list(req, res) {
    try {
      const adocoes = await prisma.adocao.findMany({
        include: {
          pet: true,
          adotante: true
        }
      });

      res.json(adocoes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao listar adoções" });
    }
  }
}

module.exports = new AdocaoController();