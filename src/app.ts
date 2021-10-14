import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { createConnection } from 'typeorm';
import { getTypeormConfig } from '@databases';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import { IEnv } from '@/configs/env';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import AuthRoute from '@routes/auth.route';

class App {
  public app: express.Application;
  public env: IEnv;

  constructor(env: IEnv) {
    this.app = express();
    this.env = env;

    this.env.isTest && this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.env.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env.nodeEnv} =======`);
      logger.info(`🚀 App listening on the port ${this.env.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer(): express.Application {
    return this.app;
  }

  private async connectToDatabase(): Promise<void> {
    await createConnection(getTypeormConfig(this.env));
  }

  private initializeMiddlewares() {
    this.app.use(morgan(this.env.logFormat, { stream }));
    this.app.use(cors({ origin: true, credentials: true }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes() {
    const routes = [new IndexRoute(), new UsersRoute(), new AuthRoute()];
    routes.forEach(route => {
      this.app.use(`${route.path}`, route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
