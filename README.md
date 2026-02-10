# 💊 Catálogo Web – Farmácia Virtual (Next.js)

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO%20Inicial&color=GREEN&style=for-the-badge)

## 📌 Visão Geral

Este projeto é um **Catálogo Virtual de Farmácia** desenvolvido com **Next.js**, criado com foco principal em **estudo e prática do framework**, explorando seus recursos modernos tanto no front-end quanto no back-end.

A aplicação simula um catálogo online de produtos farmacêuticos, permitindo visualizar, organizar e gerenciar produtos de forma estruturada, servindo como base para aplicações reais de e-commerce ou sistemas internos.

---

## 🎯 Objetivo do Projeto

O principal objetivo deste projeto é:

* Aprender e aplicar conceitos fundamentais e avançados do **Next.js**
* Explorar o **App Router** e **API Routes**
* Praticar organização de código em camadas (services, routes, etc.)
* Integrar front-end e back-end no mesmo projeto
* Simular um **catálogo virtual de farmácia**, com foco em produtos

Este projeto **não tem fins comerciais**, sendo exclusivamente voltado para **aprendizado, experimentação e portfólio**.

---

## 🧠 Conceitos e Tecnologias Utilizadas

* **Next.js** (App Router)
* **React**
* **JavaScript**
* **Tailwind CSS** para estilização
* **NextAuth.js** para autenticação
* **Prisma ORM** para acesso a dados
* **PostgreSQL** como banco de dados
* **Cloudinary** para armazenamento e gerenciamento de imagens
* **API Routes (Back-end no Next.js)**
* **Arquitetura em camadas** (models, repositories, services)
* **Node.js**

---

## 🗂️ Funcionalidades

* 📦 Exibição de produtos em formato de catálogo
* 🔍 Organização e listagem de itens
* 🧩 Estrutura preparada para CRUD de produtos
* ⚙️ Integração entre front-end e back-end

*(As funcionalidades podem evoluir conforme o projeto avança)*

---

## 🏗️ Estrutura do Projeto (resumida)

```
src/
├── app/
│   ├── admin/
│   │   └── dashboard/
│   │       └── page.jsx        # Dashboard administrativo
│   │
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/  # Configuração do NextAuth
│   │   └── products/
│   │       └── [id]/
│   │           └── route.js    # API de produtos
│   │
│   ├── auth/
│   │   └── login/
│   │       └── page.jsx        # Página de login
│   │
│   ├── carrinho/
│   │   └── page.jsx            # Carrinho de compras
│   │
│   ├── contato/
│   │   └── page.jsx            # Página de contato
│   │
│   ├── produtos/               
|   |   └── page.jsx            # Listagem de produtos
|   |
│   ├── layout.js               # Layout raiz
│   ├── page.js                 # Página inicial
│   ├── globals.css             # Estilos globais
│   └── favicon.ico
│
├── backend/
│   ├── models/                 # Modelos de domínio
│   │   ├── Produto.js
│   │   └── User.js
│   │
│   ├── repositories/           # Acesso a dados
│   │   ├── ProductRepository.js
│   │   └── UserRepository.js
│   │
│   └── services/               # Regras de negócio
│       ├── ImageService.js
│       ├── LoginService.js
│       └── ProductService.js
│
├── components/
│   ├── layout/                 # Componentes de layout e dashboard
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Dashboard.jsx
│   │   ├── CategoriaDashboard.jsx
│   │   ├── ProductDashboard.jsx
│   │   ├── ProductCreate.jsx
│   │   ├── ProductEdit.jsx
│   │   ├── ProductDelete.jsx
│   │   └── UsuarioDashboard.jsx
│   │
│   └── ui/                     # Componentes reutilizáveis
│       ├── Button.jsx
│       ├── ButtonLogout.jsx
│       ├── CardProduct.jsx
│       ├── ImageLoading.jsx
│       ├── Modal.jsx
│       ├── SearchBar.jsx
│       └── UploadImage.jsx
│
├── lib/
│   ├── auth.js                 # Configuração do NextAuth
│   ├── cloudinary.js           # Integração com Cloudinary
│   └── prisma.ts               # Cliente Prisma
│
└── public/
    ├── icons/
    └── images/

```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

* Node.js (versão LTS recomendada)
* npm ou yarn

### Passos

```bash
# Clonar o repositório
git clone https://github.com/jorgearaujor/Catalogo-Web

# Acessar o diretório
cd Catalogo-Web

# Instalar dependências
npm install

# Rodar o projeto
npm run dev
```

A aplicação estará disponível em:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 📚 Aprendizados Esperados

* Entendimento prático do funcionamento do Next.js
* Uso de rotas de API integradas ao front-end
* Organização de projetos escaláveis
* Boas práticas de desenvolvimento web

---

## 👨‍💻 Autor

Desenvolvido por **Jorge Afonso Rabelo de Araujo**
Estudante de Sistemas de Informação – IF Goiano

🔗 GitHub: [https://github.com/jorgearaujor](https://github.com/jorgearaujor)

---

## 📝 Observação Final

Este projeto está em constante evolução e serve como base de estudo. Sugestões, melhorias e feedbacks são sempre bem-vindos! 🚀
