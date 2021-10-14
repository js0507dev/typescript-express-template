import 'reflect-metadata';
import 'source-map-support/register';

import App from '@/app';
import { env } from '@configs/env';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import supertest from 'supertest';
import express from 'express';

export class TestFactory {
  private _app: App;
  private _server: express.Application;
  private _connection: Connection;

  private options: ConnectionOptions = {
    type: 'sqljs',
    database: new Uint8Array(),
    location: 'database',
    logging: false,
    synchronize: true,
    entities: ['src/entity/*.ts']
  };

  public get app(): supertest.SuperTest<supertest.Test> {
    return supertest(this._server);
  }

  public get connection(): Connection {
    return this._connection;
  }

  public get server(): express.Application {
    return this._server;
  }

  public async init(): Promise<void> {
    process.env.NODE_ENV = 'test';
    this._connection = await createConnection(this.options);
    this._app = new App(env)
    this._server = this._app.getServer();
  }

  public async close(): Promise<void> {
    await this._connection.close();
  }
}