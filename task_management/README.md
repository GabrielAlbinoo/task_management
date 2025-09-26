# 📱 Task Management System

Sistema completo de gerenciamento de tarefas com **API Laravel** e **App Mobile React Native**.

## 🏗️ Arquitetura

```
task_management/
├── task_management-api/     # Backend Laravel com Sanctum
└── task_management-mobile/  # App Mobile React Native/Expo
```

## 🚀 Tecnologias

### Backend (API)
- **Laravel 12** - Framework PHP
- **Laravel Sanctum** - Autenticação API
- **PostgreSQL** - Banco de dados
- **Docker** - Containerização
- **Livewire** - Componentes reativos

### Frontend (Mobile)
- **React Native** - Framework mobile
- **Expo** - Plataforma de desenvolvimento
- **TypeScript** - Tipagem estática
- **React Query** - Gerenciamento de estado servidor
- **React Navigation** - Navegação

## 📋 Funcionalidades

### ✅ Autenticação
- Login/Registro de usuários
- Autenticação via Sanctum tokens
- Proteção de rotas

### 📝 Gerenciamento de Tarefas
- **Criar** novas tarefas
- **Visualizar** lista de tarefas por status:
  - 🟡 Abertas
  - 🔵 Em Progresso  
  - 🟢 Finalizadas
- **Editar** tarefas existentes
- **Finalizar** tarefas
- **Assumir** tarefas (claim)
- **Deletar** tarefas

### 🎨 Interface Mobile
- Design moderno e responsivo
- Navegação por abas
- Formulários validados
- Feedback visual de carregamento

## 🛠️ Instalação e Configuração

### Pré-requisitos
- **PHP 8.2+**
- **Composer**
- **Node.js 18+**
- **Docker** e **Docker Compose**
- **Expo CLI** (para desenvolvimento mobile)

### 1️⃣ Backend (API Laravel)

```bash
# Entrar na pasta da API
cd task_management-api

# Instalar dependências PHP
composer install

# Configurar ambiente
cp .env.example .env
php artisan key:generate

# Configurar banco PostgreSQL no .env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=task_management
DB_USERNAME=admin
DB_PASSWORD=secret123

# Subir banco de dados
docker compose up -d db

# Executar migrações
php artisan migrate --graceful

# Iniciar servidor
php artisan serve
```

A API estará disponível em: `http://localhost:8000`

### 2️⃣ Frontend (App Mobile)

```bash
# Entrar na pasta do mobile
cd task_management-mobile

# Instalar dependências
npm install

# Iniciar o Expo
npx expo start
```

## 📱 Como Usar

1. **Registre-se** ou **faça login** no app
2. **Navegue** pelas abas para ver tarefas por status
3. **Crie** novas tarefas tocando no botão "+"
4. **Edite** tarefas tocando nelas
5. **Finalize** ou **assuma** tarefas conforme necessário

## 🔗 API Endpoints

### Autenticação
- `POST /api/login` - Login
- `POST /api/register` - Registro
- `POST /api/logout` - Logout (autenticado)

### Tarefas
- `GET /api/tarefas` - Listar tarefas
- `POST /api/tarefas` - Criar tarefa
- `GET /api/tarefas/{id}` - Ver tarefa específica
- `PUT /api/tarefas/{id}` - Atualizar tarefa
- `DELETE /api/tarefas/{id}` - Deletar tarefa
- `POST /api/tarefas/{id}/finalizar` - Finalizar tarefa
- `POST /api/tarefas/{id}/pegar` - Assumir tarefa

## 🗄️ Estrutura do Banco

### Tabela: `tarefas`
- `id` - ID único
- `titulo` - Título da tarefa
- `descricao` - Descrição detalhada
- `status` - Status (aberta, em_progresso, finalizada)
- `prioridade` - Prioridade (baixa, media, alta)
- `responsavel` - ID do usuário responsável
- `criado_em` - Data de criação
- `atualizado_em` - Data de atualização

## 🧪 Testes

### Backend
```bash
cd task_management-api
php artisan test
```

### Frontend
```bash
cd task_management-mobile
npm run lint
```

## 📦 Scripts Úteis

### Desenvolvimento Completo
```bash
# Terminal 1 - Backend
cd task_management-api
php artisan serve

# Terminal 2 - Frontend
cd task_management-mobile
npx expo start
```

### Docker (Backend)
```bash
cd task_management-api
docker compose up -d db  # Apenas banco
# ou
docker compose up -d     # Tudo (se configurado)
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

**Gabriel Albino**
- GitHub: [@GabrielAlbinoo](https://github.com/GabrielAlbinoo)

---

⭐ **Se este projeto te ajudou, deixe uma estrela!**

