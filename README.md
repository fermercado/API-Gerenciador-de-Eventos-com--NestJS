# Gerenciador de Eventos com NestJs 🚀

## Descrição 📝

Gerenciador de Eventos é uma plataforma desenvolvida em NestJS, Node.js e TypeScript, utilizando MongoDB para o armazenamento de dados. O sistema, encapsulado em Docker e estruturado segundo a arquitetura MVC, permite a criação de usuários e a gestão de eventos, incluindo funcionalidades de CRUD. É uma solução prática de controle sobre eventos e cadastro de usuários, com facilidade de manutenção e operação.

## 🛠️ Tecnologias e Ferramentas Utilizadas

- **Node.js**: Plataforma para execução de JavaScript no servidor.
- **TypeScript (v5.5.4)**: JavaScript com tipagem estática.
- **NestJS (v10.4.1)**: Framework progressivo para construção de aplicações web em Node.js com suporte a TypeScript.
- **Mongoose (v8.0.3)**: Biblioteca para modelar dados no MongoDB.
- **JSON Web Token - JWT (v9.0.2)**: Biblioteca para autenticação e autorização.
- **bcryptjs (v2.4.3)**: Biblioteca para hashing de senhas.
- **Swagger UI Express (v5.0.1)** e **Swagger JSDoc (v6.2.8)**: Ferramentas para documentação de APIs.
- **Yup (v1.4.0)**: Biblioteca para validação de esquemas de dados.

## 🚀 Começando

### Rodando o Projeto Localmente

Para rodar o projeto localmente, siga os passos abaixo:

## Instalação

1. **Clone este repositório:**

   ```sh
   git clone https://github.com/fermercado/API-Gerenciador-de-Eventos-com--NestJS
   ```

2. **Instale as dependências:**
   ```sh
   npm install
   ```
3. **Renomeie o arquivo de exemplo de variáveis de ambiente:**

   Renomeie o arquivo `.env.example` para `.env`:

   ```bash
   mv .env.example .env
   ```

4. **Configure as variáveis de ambiente:**
   ```env
   MONGODB_USERNAME=
   MONGODB_PASSWORD=
   JWT_SECRET=
   MONGODB_HOST=
   MONGODB_DATABASE=
   ```

Para iniciar o servidor, use o seguinte comando:

```bash
npm start
```

## 📃 Documentação da API com Swagger local

A documentação completa da API está disponível e pode ser acessada via Swagger UI. Isso permite que você visualize e interaja com a API's endpoints diretamente através do navegador.

Para acessar a documentação Swagger e testar os endpoints:

```bash
http://localhost:3000/api-docs/#/
```

### Endpoints

#### Criar Usuário

- **Endpoint:** `/api/v1/users/sign-up`
- **Método:** `POST`
- **Descrição:** Cria um novo usuário.
- **Body:**
  ```json
  {
    "firstName": "string",
    "lastName": "string",
    "birthDate": "dd/mm/yyyy",
    "city": "string",
    "country": "string",
    "email": "string",
    "password": "string",
    "confirmPassword": "string"
  }
  ```

#### Login de Usuário

- **Endpoint:** `/api/v1/users/sign-in`
- **Método:** `POST`
- **Descrição:** Realiza o login de um usuário.
- **Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

#### Atualizar Usuário

- **Endpoint:** `/api/v1/users/:id`
- **Método:** `PUT`
- **Descrição:** Atualiza um usuário existente.
- **Body:**
  ```json
  {
    "firstName": "string",
    "lastName": "string",
    "birthDate": "dd/mm/yyyy",
    "city": "string",
    "country": "string",
    "email": "string"
  }
  ```

#### Criar Evento

- **Endpoint:** `/api/v1/events`
- **Método:** `POST`
- **Descrição:** Cria um novo evento.
- **Body:**
  ```json
  {
    "description": "Event Description",
    "dayOfWeek": "monday"
  }
  ```

#### Listar Eventos

- **Endpoint:** `/api/v1/events`
- **Método:** `GET`
- **Descrição:** Lista todos os eventos.

#### Obter Evento por ID

- **Endpoint:** `/api/v1/events/:id`
- **Método:** `GET`
- **Descrição:** Obtém os detalhes de um evento específico.

#### Deletar Evento por ID

- **Endpoint:** `/api/v1/events/:id`
- **Método:** `DELETE`
- **Descrição:** Remove um evento específico.

#### Deletar Eventos por Dia da Semana

- **Endpoint:** `/api/v1/events`
- **Método:** `DELETE`
- **Descrição:** Remove eventos de um dia específico da semana.
