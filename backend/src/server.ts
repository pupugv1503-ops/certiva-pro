import App from './app';

// Initialize the application
const app = new App();

// Start the server
app.listen();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  // Close server & exit process
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  // Close server & exit process
  process.exit(1);
});

// Handle SIGTERM (for Docker and other container orchestration)
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  // Close server & exit process
  process.exit(0);
});
