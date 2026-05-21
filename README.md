# Royal Barber - Sistema de Agendamento

Sistema completo para barbearia premium com site responsivo, agendamento online, painel administrativo, API Express e MongoDB.

## Estrutura

```txt
barbershop-system/
├── frontend/   # React + Vite + Tailwind CSS
├── backend/    # Node.js + Express + MongoDB
└── README.md
```

## Funcionalidades

- Home premium com imagem online, serviços, avaliações, galeria, localização e WhatsApp.
- Catálogo de serviços com preço e duração.
- Lista de barbeiros com fotos públicas e horários disponíveis.
- Agendamento real via API: serviço, barbeiro, data, horário, nome e telefone.
- Mensagem automática para WhatsApp após confirmar.
- Login admin com JWT.
- Painel admin para ver/cancelar agendamentos, clientes, editar serviços e adicionar barbeiros/horários.
- Loading, skeleton, toast notifications, navbar fixa, menu mobile e SEO básico.

## Rodar o backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Configure o arquivo `.env`:

```env
PORT=5000
MONGODB_URI=sua_url_mongodb_atlas
JWT_SECRET=um_segredo_forte
ADMIN_EMAIL=admin@royalbarber.com
ADMIN_PASSWORD=admin123
FRONTEND_URL=http://localhost:5173
```

A API cria automaticamente o usuário admin, serviços e barbeiros iniciais quando inicia.

## Rodar o frontend

```bash
cd frontend
npm install
npm run dev
```

Se a API estiver em outro endereço, crie `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000
```

## Rotas da API

- `POST /login`
- `GET /services`
- `POST /services`
- `PUT /services/:id`
- `DELETE /services/:id`
- `GET /barbers`
- `POST /barbers`
- `GET /appointments`
- `POST /appointments`
- `DELETE /appointments/:id`

Rotas administrativas exigem header:

```txt
Authorization: Bearer SEU_TOKEN
```

## Deploy na Vercel

### Opção simples: frontend pela raiz

Se você subir a pasta `barbershop-system` inteira no GitHub, a Vercel pode usar a raiz do repositório.

- Framework preset: `Other`
- Build command: `npm run build`
- Output directory: `frontend/dist`
- Variável: `VITE_API_URL=https://url-do-seu-backend.vercel.app`

### Backend

1. Crie um projeto Vercel apontando para a pasta `backend`.
2. Configure as variáveis `MONGODB_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` e `FRONTEND_URL`.
3. Faça deploy. O arquivo `backend/vercel.json` direciona as rotas para `api/index.js`.

### Frontend

1. Crie outro projeto Vercel apontando para a pasta `frontend`.
2. Configure `VITE_API_URL` com a URL pública do backend.
3. Build command: `npm run build`.
4. Output directory: `dist`.

## Imagens

Todas as imagens usadas no projeto são URLs públicas do Unsplash ou Pexels, compatíveis com GitHub e Vercel.

## Credenciais iniciais

- E-mail: `admin@royalbarber.com`
- Senha: `admin123`

Troque essas credenciais no `.env` antes de publicar.
