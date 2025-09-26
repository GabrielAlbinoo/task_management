# Task Management System

Sistema completo de gerenciamento de tarefas com API Laravel e aplicativo mobile React Native.

## Estrutura do Projeto

```
task_management/
├── task_management-api/     # API Laravel com autenticação e CRUD
├── task_management-mobile/ # App React Native com Expo
```

## Tecnologias Utilizadas

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

##  Instalação e Configuração

### Pré-requisitos
- PHP 8.2+ (https://www.php.net/downloads.php)
- Composer (https://getcomposer.org/download/)
- Node.js 18+
- Docker e Docker Compose
- Expo CLI

### API (Backend)

- Inicie o Docker
- adicione essas extensões ao php .ini (ou copie o que está no repositório)

```bash
extension=pdo_pgsql
extension=pgsql
extension=fileinfo
extension=openssl
extension=zip
extension_dir = "./ext"
```

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
