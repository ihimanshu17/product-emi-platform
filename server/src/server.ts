import app from './app';
import { checkPrismaConnection } from './services/db';

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Attempt Prisma database initialization
    await checkPrismaConnection();

    app.listen(PORT, () => {
      console.log(`🚀 1Fi Product EMI API server is listening on port ${PORT}`);
      console.log(`🌐 Base URL: http://localhost:${PORT}`);
      console.log(`📚 Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
