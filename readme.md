# 🩺 API de Gestão de Usuários e Exames

Esta é uma API REST desenvolvida para gerenciamento de usuários e exames médicos. Ela inclui autenticação com JWT, registro e login de usuários, recuperação de senha e operações CRUD para exames.

---

## 🚀 Tecnologias utilizadas

* Node.js
* Express
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* Dotenv

---

## ⚙️ Configuração do ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
PORT=3000
MONGO_URI=sua_string_de_conexao_mongodb
JWT_SECRET_KEY=sua_chave_secreta
```

---

## ▶️ Como rodar o projeto

```bash
# instalar dependências
npm install

# rodar em modo desenvolvimento
npm run dev

# ou rodar normalmente
npm start
```

A API estará rodando em:

```
http://localhost:3000
```

---

## 🔐 Autenticação de Usuário

### 📌 Registrar usuário

**POST** `/api/auth/register`

```json
{
  "name": "Seu Nome",
  "email": "email@email.com",
  "password": "123456",
  "role": "user"
}
```

---

### 📌 Login de usuário

**POST** `/api/auth/login`

```json
{
  "email": "email@email.com",
  "password": "123456"
}
```

**Resposta:**

```json
{
  "token": "jwt_token_aqui"
}
```

---

### 📌 Recuperar senha

**POST** `/api/auth/reset-password`

```json
{
  "email": "email@email.com"
}
```

---

## 🧪 Rotas de Exames (Protegidas)

⚠️ Todas as rotas abaixo precisam de autenticação via token JWT no header:

```
Authorization: Bearer seu_token
```

---

### 📌 Buscar todos os exames

**GET** `/api/exames/todosOsExames`

---

### 📌 Adicionar exame

**POST** `/api/exames/addExames`

```json
{
  "nome": "Carlos silva",
  "exame": "Exame de Sangue",
  "descricao": "Verificação geral",
  "data": "2026-03-30",
  "andamento": "para enviar"
}
```

---

### 📌 Atualizar exame por ID

**PUT** `/api/exames/updateExame/:id`

```json
{
  "andamento": "Entrege"
}
```

---

### 📌 Deletar exame por ID

**DELETE** `/api/exames/removeExame/:id`

---

## 🛡️ Middleware de Autenticação

A API utiliza um middleware que:

* Verifica se o token JWT foi enviado
* Valida o token
* Libera ou bloqueia o acesso às rotas protegidas

---

## 📁 Estrutura básica sugerida

```
src/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── middlewares/
 └── server.js
```

---

## 💡 Melhorias futuras

* Implementar envio de email real para recuperação de senha
* Adicionar validação com Joi ou Zod
* Criar sistema de roles (admin/usuário)
* Paginação para listagem de exames
* Upload de arquivos (ex: resultados em PDF)

---

## 📌 Autor

Desenvolvido por **Italo Marcelo**

---
