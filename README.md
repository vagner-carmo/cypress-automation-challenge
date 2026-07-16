# Cypress Automation Challenge

Projeto de automação de testes desenvolvido utilizando **Cypress** e **JavaScript**, contemplando testes End-to-End e testes de API para a aplicação **ServeRest**.

## Tecnologias utilizadas

* Cypress
* JavaScript (ES6+)
* Node.js
* AJV (JSON Schema Validator)
* Faker.js

## Aplicação

**Frontend**

https://front.serverest.dev/

**API**

https://serverest.dev/

---

## Estrutura do projeto

```text
cypress
├── api
│   ├── LoginApi.js
│   ├── ProductsApi.js
│   └── UsersApi.js
│
├── e2e
│   ├── api
│   └── frontend
│
├── factories
│   ├── productFactory.js
│   └── userFactory.js
│
├── fixtures
│   ├── imagens
│
├── pages
│   ├── Login
│   ├── ProductRegister
│   ├── UserRegister
│
├── schemas
│   ├── login
│   ├── products
│   └── users
│
└── support
    ├── commands.js
    └── schemaValidators.js
```

---

## Padrões adotados

O projeto foi estruturado utilizando boas práticas de automação de testes:

* Page Object Model (POM)
* API Layer para centralização das chamadas REST
* Factory Pattern para geração de dados
* JSON Schema Validation utilizando AJV
* Custom Commands do Cypress
* Separação entre Frontend e API
* Código reutilizável e de fácil manutenção

---

## Pré-requisitos

- Node.js 18 ou superior
- npm 9 ou superior (ou yarn)
- Git

---

## Instalação

Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
```

Acesse a pasta do projeto:

```bash
cd <NOME_DO_PROJETO>
```

Instale todas as dependências do projeto:

```bash
npm install
```

> O comando acima instalará automaticamente todas as dependências definidas no `package.json`, incluindo:
>
> * Cypress
> * @faker-js/faker
> * AJV

Caso deseje instalar manualmente:

```bash
npm install cypress --save-dev
npm install @faker-js/faker --save-dev
npm install ajv --save-dev
```

---

## Executando os testes

Abrir o Cypress:

```bash
npx cypress open
```

Executar todos os testes:

```bash
npx cypress run
```

Executar apenas os testes de Frontend:

```bash
npx cypress run --spec "cypress/e2e/frontend/**/*.cy.js"
```

Executar apenas os testes de API:

```bash
npx cypress run --spec "cypress/e2e/api/**/*.cy.js"
```

---

## Cobertura dos testes

### Frontend

#### Login

* Login com sucesso
* Tentativa de login com credenciais inválidas
* Tentativa de login com campos obrigatórios em branco

#### Cadastro de Usuários

* Cadastro realizado com sucesso
* Tentativa de cadastro com e-mail já existente

#### Cadastro de Produtos

* Cadastro realizado com sucesso
* Tentativa de cadastro com campos obrigatórios em branco
* Tentativa de cadastro com nome de produto já existente

---

### API

#### Login

* Login com sucesso
* Tentativa de login com credenciais inválidas
* Tentativa de login com campos obrigatórios em branco

#### Usuários

* Criar usuário com sucesso
* Tentativa de criar usuário com e-mail duplicado
* Listar usuários com sucesso
* Buscar usuário por ID com sucesso
* Tentativa de buscar usuário com ID inexistente
* Atualizar usuário com sucesso
* Tentativa de atualizar usuário utilizando e-mail já existente
* Excluir usuário com sucesso
* Tentativa de excluir usuário com ID inexistente

#### Produtos

* Criar produto com sucesso
* Tentativa de criar produto com nome já existente
* Tentativa de criar produto com token inválido
* Listar produtos com sucesso
* Buscar produto por ID com sucesso
* Tentativa de buscar produto inexistente
* Excluir produto com sucesso
* Tentativa de excluir produto associado a um carrinho
* Tentativa de excluir produto com token inválido
* Atualizar produto com sucesso
* Tentativa de atualizar produto utilizando nome já existente
* Tentativa de atualizar produto com token inválido

---

## Validação de Schema

As respostas da API são validadas utilizando JSON Schema através da biblioteca AJV, garantindo que o contrato da API permaneça consistente.

---

## Organização do código

O projeto foi organizado com foco em escalabilidade e manutenção.

* **Pages:** encapsulam as ações e validações das páginas.
* **Locators:** centralizam os seletores dos elementos.
* **API:** centraliza todas as chamadas REST.
* **Factories:** responsáveis pela geração de dados para os testes.
* **Schemas:** armazenam os contratos JSON utilizados nas validações.
* **Validators:** encapsulam validações reutilizáveis.

---

## Autor

Desenvolvido por **Vagner Macedo do Carmo**.
