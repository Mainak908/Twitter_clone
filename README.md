# 🐦 Twitter Clone – Fullstack GraphQL

A modern fullstack **Twitter clone** built with GraphQL and Next.js. Tweet, like, reply, follow users, and explore a clean UI powered by modern web technologies.

![Next.js](https://img.shields.io/badge/Frontend-Next.js-blue?style=flat-square)
![GraphQL](https://img.shields.io/badge/API-GraphQL-ff69b4?style=flat-square)
![Database](https://img.shields.io/badge/Database-PostgreSQL-blue?style=flat-square)
![License](https://img.shields.io/github/license/Mainak908/twitter-clone)

---

## ✨ Features

- 🧑‍💻 **Authentication (JWT + Cookies)**
- 📝 **Post Tweets, Replies, and Threads**
- ❤️ **Like Tweets**
- 👤 **User Profiles**
- 🔁 **Follow/Unfollow Users**
- 🔍 **Explore Feed**
- 🌐 **GraphQL API (code-first with type safety)**
- 💅 **Beautiful responsive UI with Tailwind CSS**

---

## 🛠 Tech Stack

| Layer         | Technology                      |
|---------------|----------------------------------|
| **Frontend**  | Next.js 15 (App Router)   |
| **API Layer** | GraphQL (codegen + graphql-request) |
| **Backend**   | Express Js with Apollo Graphql Server  |
| **Database**  | PostgreSQL               |
| **ORM**       | Prisma                           |
| **Auth**      | JWT + HTTP-only cookies          |
| **UI**        | Tailwind CSS                     |
| **Codegen**   | GraphQL Code Generator           |
| **Deployment**| Vercel ,Google CloudRun        |

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/twitter-clone.git
cd twitter-clone

## setup Frontend
cd client

npm i
npm run dev

## setup Backend
cd server
npm i

# setup prisma client
npx prisma generate

# start server
npm run dev
