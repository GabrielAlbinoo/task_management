# Instruções de Instalação

## Pré‑requisitos
- PHP 8.2+
- Composer
- Docker e Docker Compose

## Passo a passo
1. Clonar o repositório:
   ```bash
   git clone https://github.com/GabrielAlbinoo/task_management task_management && cd task_management
   ```
2. Instalar dependências PHP:
   ```bash
   composer install
   ```
3. Criar o arquivo de ambiente e a chave da aplicação:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
4. Configurar o banco PostgreSQL no `.env`:
   ```env
   DB_CONNECTION=pgsql
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_DATABASE=task_management
   DB_USERNAME=admin
   DB_PASSWORD=secret123
   ```
5. Subir o banco de dados (Docker Compose):
   ```bash
   docker compose up -d db
   ```
   Alternativa com `docker run`:
   ```bash
   docker run --name task_management-db -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=secret123 -e POSTGRES_DB=task_management -p 5432:5432 -d postgres:16
   ```
6. Executar migrações (e seed opcional):
   ```bash
   php artisan migrate --graceful
   ```
7. Iniciar a aplicação:
   ```bash
   php artisan serve
   ```
