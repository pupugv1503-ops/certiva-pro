import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { createServer, Server as HttpServer } from 'http';
import { errorHandler } from './middleware/error.middleware';
import { notFoundHandler } from './middleware/notFound.middleware';
import { logger } from './utils/logger';
import { writeCertificatePdfToResponse } from './utils/certificatePdf';
import { authRouter } from './routes/auth.routes';
import { aiRouter } from './routes/ai.routes';

// Load environment variables
dotenv.config();

class App {
  public app: Application;
  public server: HttpServer;
  public port: string | number;
  public env: string;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.port = process.env.PORT || 5000;
    this.env = process.env.NODE_ENV || 'development';

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    // Security middleware
    this.app.use(helmet());
    
    // CORS configuration
    const configuredOrigin = process.env.CORS_ORIGIN;
    this.app.use(
      cors({
        origin: configuredOrigin || true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: Boolean(configuredOrigin),
      })
    );
    
    // Request logging
    if (this.env === 'development') {
      this.app.use(morgan('dev'));
    }
    
    // Parse JSON and URL-encoded bodies
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    
    // Health check endpoint
    this.app.get('/health', (req: Request, res: Response) => {
      res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
    });
  }

  private initializeRoutes(): void {
    // API routes will be mounted here
    const apiPrefix = process.env.API_PREFIX || '/api/v1';
    
    // Example route
    this.app.get(`${apiPrefix}/`, (req: Request, res: Response) => {
      res.json({
        message: 'Welcome to the API',
        version: '1.0.0',
        docs: `/api-docs` // Will be added when we add API documentation
      });
    });

    // Certificate download (PDF)
    this.app.get(`${apiPrefix}/certificates/:certificateId/download`, (req: Request, res: Response) => {
      const { certificateId } = req.params;
      const holderName = (req.query.holderName as string) || 'Certificate Holder';
      const certificationTitle = (req.query.title as string) || 'Certification';
      const scoreRaw = req.query.score as string | undefined;
      const score = scoreRaw ? Number(scoreRaw) : 0;
      const issueDate = (req.query.issueDate as string) || new Date().toISOString().slice(0, 10);

      writeCertificatePdfToResponse(res, {
        certificateId,
        holderName,
        certificationTitle,
        score: Number.isFinite(score) ? score : 0,
        issueDate,
      });
    });

    // Auth + AI routes
    this.app.use(`${apiPrefix}/auth`, authRouter);
    this.app.use(`${apiPrefix}`, aiRouter);
    
    // Add more routes here
    // this.app.use(`${apiPrefix}/users`, userRoutes);
    // this.app.use(`${apiPrefix}/auth`, authRoutes);
  }

  private initializeErrorHandling(): void {
    // Handle 404
    this.app.use(notFoundHandler);
    
    // Handle other errors
    this.app.use(errorHandler);
  }

  public listen(): void {
    this.server.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on port ${this.port}`);
      logger.info(`=================================`);
    });
  }
}

export default App;
