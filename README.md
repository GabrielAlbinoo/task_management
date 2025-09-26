# Task Management System

Sistema completo de gerenciamento de tarefas com API Laravel e aplicativo mobile React Native.

## 📁 Estrutura do Projeto

```
task_management/
├── task_management-api/     # API Laravel com autenticação e CRUD
├── task_management-mobile/ # App React Native com Expo
└── task_management/         # Documentação adicional
```

## 🚀 Tecnologias Utilizadas

### Backend (API)
- **Laravel 11** - Framework PHP
- **PostgreSQL** - Banco de dados
- **Laravel Sanctum** - Autenticação API
- **Swagger** - Documentação da API
- **Docker** - Containerização

### Frontend (Mobile)
- **React Native** - Framework mobile
- **Expo** - Plataforma de desenvolvimento
- **TypeScript** - Linguagem tipada
- **Expo Router** - Navegação

## 📋 Funcionalidades

- ✅ Autenticação de usuários
- ✅ CRUD completo de tarefas
- ✅ Categorização por status (Aberta, Em Progresso, Finalizada)
- ✅ Sistema de prioridades
- ✅ Interface mobile responsiva
- ✅ API REST documentada

## 🛠️ Instalação e Configuração

### Pré-requisitos
- PHP 8.2+
- Composer
- Node.js 18+
- Docker e Docker Compose
- Expo CLI

### API (Backend)
```bash
cd task_management-api
composer install
cp .env.example .env
php artisan key:generate
docker compose up -d db
php artisan migrate
php artisan serve
```

### Mobile (Frontend)
```bash
cd task_management-mobile
npm install
npx expo start
```

## 📖 Documentação

- [API Documentation](task_management-api/README.md)
- [Mobile App Documentation](task_management-mobile/README.md)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
