-- CreateTable
CREATE TABLE "public"."pets" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3),
    "descricao" TEXT,
    "status" TEXT NOT NULL DEFAULT 'disponivel',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."adotantes" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "endereco" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "adotantes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."adocoes" (
    "id" SERIAL NOT NULL,
    "petId" INTEGER NOT NULL,
    "adotanteId" INTEGER NOT NULL,
    "dataAdocao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "adocoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "adotantes_email_key" ON "public"."adotantes"("email");

-- AddForeignKey
ALTER TABLE "public"."adocoes" ADD CONSTRAINT "adocoes_petId_fkey" FOREIGN KEY ("petId") REFERENCES "public"."pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."adocoes" ADD CONSTRAINT "adocoes_adotanteId_fkey" FOREIGN KEY ("adotanteId") REFERENCES "public"."adotantes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
