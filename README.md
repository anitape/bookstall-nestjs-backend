# Bookstall Backend

Bookstall is a backend application for managing an online book library. It provides a robust and modular structure, where users can browse, add, and manage books. The system includes secure authentication and authorization using JWT and age-restriction checks to ensure compliance with content policies. Additionally, the application features protected endpoints, optional authentication for public access, role-based access control and clean architecture that supports scalability and maintainability.

## 🛠 Tech Stack

| Technology    | Description |
| --------------- | ---------------------------------- |
| NestJS          | Main application framework         |
| TypeScript      | Primary programming language       |
| Passport.js     | Authentication middleware          |
| JWT             | Token-based authentication system  |
| TypeORM         | ORM for database access            |
| PostgreSQL      | Relational database                |
| class-validator | Input validation decorators        |
| Bcrypt          | Password hashing                   |


## 🚀 Features

**User Authentication & Authorization**

- JWT-based authentication
- Login & registration with hashed passwords
- Optional authentication for public endpoints

**Role-Based Access Control**

- Only book owners can delete their books

**Book Management**

- CRUD operations for books
- Each book can include an age restriction (e.g. 18+)
- Only authorized users can access or modify restricted content

**Age Restriction Logic**

- Unauthenticated users or users under 18 cannot access adult-only books
- Optional authentication guard (`JwtOptionalGuard`) supports guest access with limited rights

**Guards and Middleware**

- Custom `JwtOptionalGuard` extends JWT strategy to allow anonymous access when appropriate
- Age-based access enforcement at the service level

**Validation & Error Handling**

- Centralized exception filters
- Input validation via class-validator and pipes

**Clean Architecture**

- Modular structure (e.g., `auth`, `books`, `users` modules)
- Clear separation of concerns between controllers, services, and repositories


## ✅ Example Use Cases

- Guests can browse books that not have age restriction 18+
- Logged-in users can add and manage their own books
- Age-restricted books are only accessible by adults



# NestJS

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

