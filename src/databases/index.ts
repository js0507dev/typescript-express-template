import path from 'path';
import { ConnectionOptions } from 'typeorm';
import { IEnv } from '@/configs/env';

export const getTypeormConfig = (env: IEnv): ConnectionOptions => {
  const options:ConnectionOptions = {
    name: 'main',
    type: 'mysql',
    synchronize: false,
    logging: true,
    replication: {
      master: {
        host: env.masterDBHost,
        port: env.masterDBPort,
        username: env.masterDBUsername,
        password: env.masterDBPassword,
        database: env.dbSchema,
      },
      slaves: [ {
        host: env.slaveDBHost,
        port: env.slaveDBPort,
        username: env.slaveDBUsername,
        password: env.slaveDBPassword,
        database: env.dbSchema,
      } ]
    },
    entities: [ 'src/entity/*.ts' ],
  };
  return options;
};
