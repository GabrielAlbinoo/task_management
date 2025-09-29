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

## Guia para Rodar o Projeto

### Pré-requisitos
- Docker e Docker Compose
- Node.js 18+
- Aplicativo **Expo Go** instalado no celular

### Passo a passo
1. Suba a API:
   ```bash
   cd task_management-api
   docker compose up -d
   ```
2. Instale as dependências do app mobile:
   ```bash
   cd ../task_management-mobile
   npm install
   ```
3. Descubra o IP local do computador (Windows):
   ```bash
   ipconfig
   ```
   Anote o endereço IPv4 para usar como base da API.
4. Configure o `.env` do mobile com o IP encontrado:
   ```env
   EXPO_PUBLIC_API_URL=http://SEU_IP/api
   ```
5. Inicie o aplicativo mobile:
   ```bash
   npm start
   ```
6. Abra o **Expo Go** no celular e escaneie o QR Code exibido para carregar o aplicativo.
