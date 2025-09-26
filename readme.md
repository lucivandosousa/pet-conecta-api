# 🐾 API de Adoção de Pets

Esta é a API de Adoção de Pets, desenvolvida com Node.js, Express e Prisma ORM, que permite gerenciar informações sobre pets disponíveis para adoção, bem como os usuários que desejam adotá-los.

## 📌 Funcionalidades

- Listar pets disponíveis para adoção
- Cadastrar novos pets
- Atualizar informações de pets
- Remover pets
- Cadastrar usuários adotantes
- Listar adoções realizadas

## ⚙️ Tecnologias Utilizadas

- Node.js
- Express
- Prisma ORM
- PostgreSQL

## ✅ Pré-requisitos

- Node.js
- npm
- PostgreSQL
- Docker (opcional, para facilitar a configuração do banco de dados)

## 🚀 Como Executar

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Configure o banco de dados no arquivo `.env`
4. Execute as migrações: `npx prisma migrate dev`
5. Inicie o servidor: `npm run dev`
6. Acesse a API em `http://localhost:<PORTA>/`