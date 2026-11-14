# Vaultify

**A Password Management and Phishing Awareness Platform**

Vaultify is an educational web application designed to promote better password security practices and increase awareness of phishing threats.

The project aims to provide participants with a platform for understanding password security, recognizing suspicious websites, and developing safer online habits.

> **Project Status:** Under Development

## Features

### Implemented
- User registration
- User login and logout
- Session-based authentication using Laravel Sanctum
- Protected participant dashboard
- Public landing page
- Reusable dashboard sidebar and branding components

### Planned
- Password Vault
- Security Awareness section
- Participant profile management
- Educational phishing simulations
- Additional security awareness activities

## Technology Stack

### Backend
- PHP
- Laravel
- Laravel Sanctum
- MySQL

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- React Router

## Project Structure

The project uses a separate backend and frontend architecture.

```text
phishing-resistant-auth/
│
├── phishing-auth-backend/
│   ├── app/
│   ├── bootstrap/
│   ├── config/
│   ├── database/
│   ├── routes/
│   └── ...
│
├── phishing-auth-frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── services/
│   └── ...
│
└── README.md
```

## Requirements

Before setting up the project, ensure the following are installed:

- PHP
- Composer
- Node.js and npm
- MySQL or XAMPP
- Git

## Installation and Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd phishing-resistant-auth
```

Replace `<repository-url>` with the repository's actual GitHub URL.

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd phishing-auth-backend
```

Install PHP dependencies:

```bash
composer install
```

Create the environment configuration:

```bash
cp .env.example .env
```

On Windows PowerShell, you can use:

```powershell
Copy-Item .env.example .env
```

Generate the application key:

```bash
php artisan key:generate
```

### 3. Database Configuration

Create a MySQL database named:

```text
password_manager
```

Configure the backend `.env` file:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=password_manager
DB_USERNAME=root
DB_PASSWORD=
```

Configure Sanctum's stateful domains:

```env
SANCTUM_STATEFUL_DOMAINS=localhost:5173,127.0.0.1:5173
```

Configure the session settings for local development:

```env
SESSION_DRIVER=database
SESSION_DOMAIN=null
SESSION_SECURE_COOKIE=false
SESSION_SAME_SITE=lax
```

Run the database migrations:

```bash
php artisan migrate
```

Clear cached configuration:

```bash
php artisan optimize:clear
```

### 4. Start the Backend

```bash
php artisan serve
```

The backend should be accessible at:

```text
http://localhost:8000
```

### 5. Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd phishing-auth-frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend should be accessible at:

```text
http://localhost:5173
```

## Authentication Architecture

Vaultify uses Laravel Sanctum's session-based authentication for communication between the React frontend and Laravel backend.

The frontend communicates with the backend through Axios.

### Authentication Endpoints

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/register` | Register an account | Public |
| POST | `/api/login` | Authenticate a user | Public |
| GET | `/api/user` | Retrieve authenticated user | Protected |
| POST | `/api/logout` | End the session | Protected |
| GET | `/api/participant/dashboard` | Retrieve dashboard information | Protected |

Authentication requests use Laravel's CSRF protection and session cookies.

## Security and Educational Guidelines

Vaultify is intended for educational and awareness purposes.

The following guidelines apply to the development and testing of the project:

- Use synthetic or dummy participant data for demonstrations.
- Never collect or retain real passwords through phishing simulations.
- Store legitimate account passwords using secure one-way password hashing.
- Do not commit `.env` files, credentials, API secrets, or other sensitive information.
- Conduct simulations only within authorized and controlled environments.
- Record educational interaction outcomes rather than actual credentials.

## Development Notes

- The backend and frontend are maintained in separate directories.
- Backend API responses should be designed around the database schema and its relationships.
- Database migrations should be reviewed before being shared with the team.
- Keep authentication and user data handling consistent with Laravel's security mechanisms.
- Features marked as planned are not yet available.

## Contributors

Add the names of the project members here.

1. Member 1
2. Member 2
3. Member 3

## License

This project is currently an academic development project. Licensing and distribution terms can be determined by the project team.
