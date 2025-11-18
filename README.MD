# 🧱 Backend Boilerplate Repository (Node.js + TypeScript)

This repository provides a **work-ready backend boilerplate** for building scalable, secure, and maintainable RESTful APIs using **Node.js**, **TypeScript**, **Express**, **Objection.js/Knex**, and **PostgreSQL**.  
It also includes integrated **Swagger API documentation**, **Cucumber.js + Axios + Chai** test automation, **Docker support**, and **Winston-based logging**.

---

## 🚀 Quickstart

```bash
npm install
npm run dev
```

Now open in browser:

> http://localhost:5001/sample/0/check/randomNumber  

✅ You should see a random number response as a health check.

---

### Or run each step manually:

1. **Transpile TypeScript**
   ```bash
   tsc
   ```

2. **Run ESLint**
   ```bash
   npm run lint
   ```

3. **Run the built app**
   ```bash
   node build/app.js
   ```

---

## 🧭 Routes

| Endpoint | Description |
|-----------|-------------|
| `/` | Healthcheck |
| `/check/randomNumber` | Returns a random number (sample route) |
| `/api-docs` | Swagger UI Documentation |

Example:
> http://localhost:5001/check/randomNumber  
> http://localhost:5001/api-docs  

---

## ⚙️ Technologies Used

- **Node.js + TypeScript** — core backend framework
- **Express.js** — API routing and middleware
- **Objection.js + Knex** — ORM and SQL query builder
- **PostgreSQL** — database
- **Winston** — structured logging
- **Helmet, CORS, Rate Limiter** — security middlewares
- **Swagger-jsdoc + swagger-ui-express** — API documentation
- **Cucumber.js + Axios + Chai** — BDD API testing
- **Docker + Docker Compose** — containerized setup
- **ESLint + Prettier** — code style and linting

---

## 🏗️ Folder Structure

```
src/
├── app.ts               # Express app initialization
├── index.ts             # Application entry point
├── config/              # Environment variables, DB, and app configs
│   ├── config.ts
│   └── db.ts
├── controllers/         # Business logic handlers
├── middlewares/         # Auth, rate limiting, validation, etc.
├── models/              # Objection.js models
│   ├── BaseModel.ts
│   └── UserModel.ts
├── routes/              # Express route definitions
│   └── index.ts
├── utils/               # Logger, helper functions
│   ├── logger.ts
│   └── response.ts
└── tests/               # Test suite (Cucumber + Chai + Axios)
    ├── features/
    ├── steps/
    ├── support/
    └── data/
```

---

## 🧪 Testing (Cucumber + Axios + Chai)

The project uses **Cucumber.js** for BDD-style API testing, **Axios** for HTTP calls, and **Chai** for assertions.

### 🧠 Folder Structure for Tests

```
tests/
├── features/           # Cucumber feature files (.feature)
├── steps/              # Step definitions (.ts)
├── support/            # Hooks, environment setup, reusable config
└── data/               # Sample payloads, JSON files
```

### 🧩 How to Create Test Scenarios

1. Create a new feature file under `tests/features`  
   Example: `tests/features/user.feature`
   ```gherkin
   Feature: User API

     Scenario: Fetch user details by ID
       Given I have a valid user ID
       When I send a GET request to "/users/1"
       Then the response status should be 200
       And the response body should contain "name"
   ```

2. Create step definitions under `tests/steps/user.steps.ts`
   ```ts
   import { Given, When, Then } from "@cucumber/cucumber";
   import axios from "axios";
   import { expect } from "chai";
   import { BASE_URL } from "../support/env";

   let response: any;

   Given("I have a valid user ID", function () {
     this.userId = 1;
   });

   When("I send a GET request to {string}", async function (endpoint: string) {
     response = await axios.get(`${BASE_URL}${endpoint}`);
   });

   Then("the response status should be {int}", function (statusCode: number) {
     expect(response.status).to.equal(statusCode);
   });

   Then("the response body should contain {string}", function (key: string) {
     expect(response.data).to.have.property(key);
   });
   ```

3. Run your tests:
   ```bash
   npm run test
   ```

4. Run a specific feature file:
   ```bash
   npx cucumber-js tests/features/user.feature
   ```

5. Run tests with tags:
   Add tags in feature file:
   ```gherkin
   @smoke
   Scenario: Fetch user details
   ```
   Run using:
   ```bash
   npx cucumber-js --tags "@smoke"
   ```

### 🧱 Script Configuration in `package.json`
```json
"scripts": {
  "test": "cucumber-js --require-module ts-node/register --require tests/steps --require tests/support --format progress"
}
```

### 🧾 Assertion Tips

- Use `chai.expect` for readable assertions.
- Keep each `Scenario` independent and small.
- Prefer environment variables for test base URLs and credentials.

---

## 📜 Swagger API Documentation

Access Swagger UI at: **http://localhost:5001/api-docs**

Swagger annotations are written using **OpenAPI JSDoc** in route files.

Example:
```js
/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login API
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
```

---

## 🧰 Logger (Winston)

Logs all requests and errors with timestamps to `/logs/` folder.

Example configuration (`src/utils/logger.ts`):
```ts
import { createLogger, format, transports } from "winston";

export const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combined.log" }),
  ],
});
```

---

## 🐳 Docker Setup

Run the app with PostgreSQL inside containers:

```bash
docker-compose up --build
```

**docker-compose.yml**
```yaml
version: "3.8"

services:
    boilerplate:
        container_name: boilerplate
        image: boilerplate
        build:
            context: .
            dockerfile: Dockerfile
        env_file:
            - .env
        ports:
            - "5100:5100"
        volumes:
            - ./logs:/usr/src/app/boilerplate/logs
        deploy:
            resources:
                limits:
                    cpus: "1"
                    memory: 4G
            restart_policy:
                condition: on-failure
```

---

## 🔐 Encryption & Decryption Middleware

This boilerplate includes middleware for **AES-256-GCM encryption & decryption**, controlled via:

```
X-API-Encrypt: true | false
```

(Default = `true`)

### 📌 Usage

```ts
app.use(
  `${routeURL}/dashboard`,
  decryptionMiddleware,
  dashBoardRouter,
  encryptionMiddleware
);
```

### Handles:
- Body decryption → `req.body.data`
- Query param decryption → `req.query.data`
- Response encryption → `res.locals.apiResponse.data`

### Encrypted Request Format

```json
{
  "data": "iv:encryptedText:authTag"
}
```

### Encrypted Response Format

```json
{
  "status": 200,
  "error": false,
  "data": "iv:encryptedText:authTag"
}
```

### Controller Output Format

```ts
res.locals.apiResponse = {
  status: 200,
  error: false,
  data: { ... }
};
```

Middleware encrypts automatically.
