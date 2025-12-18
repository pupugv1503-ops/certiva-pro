# Node.js Backend

A modern, scalable, and well-structured Node.js backend built with TypeScript, Express, and other best practices.

## Features

- 🚀 **TypeScript** - Type safety and better developer experience
- 🛡️ **Security** - Helmet, CORS, rate limiting, and other security best practices
- 📊 **Logging** - Winston logger with file rotation
- 🔄 **Development** - Hot-reloading with nodemon
- 🧪 **Testing** - Jest and Supertest for testing
- 🔍 **Linting & Formatting** - ESLint and Prettier
- 📝 **API Documentation** - (Coming soon with Swagger)

## Prerequisites

- Node.js >= 14.0.0
- npm >= 6.0.0
- TypeScript >= 4.0.0

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your configuration.

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The server will be available at `http://localhost:5000`

## Available Scripts

- `npm run dev` - Start the development server with hot-reloading
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report

## Project Structure

```
backend/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── interfaces/     # TypeScript interfaces
│   ├── middleware/     # Custom middleware
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── utils/          # Utility functions
│   ├── app.ts          # Express application
│   └── server.ts       # Server entry point
├── tests/             # Test files
├── .env.example       # Example environment variables
├── .gitignore         # Git ignore file
├── package.json       # Project dependencies and scripts
├── tsconfig.json      # TypeScript configuration
└── README.md          # This file
```

## Environment Variables

See `.env.example` for all available environment variables.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Winston](https://github.com/winstonjs/winston)
- [Jest](https://jestjs.io/)
- And all other amazing open-source projects that made this possible.
