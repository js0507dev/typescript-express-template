import * as dotenv from 'dotenv';
dotenv.config();

export default [{
  name: 'migration',
    type: 'mysql',
    logging: true,
    host: process.env.masterDBHost,
    port: process.env.masterDBPort,
    username: process.env.masterDBUsername,
    password: process.env.masterDBPassword,
    database: process.env.dbSchema,
    entities: [ 'src/entity/*.ts' ],
    migrations: [ 'src/migrations/*.ts' ],
    cli: {
    migrationsDir: 'src/migrations',
  },
},{
  name: 'seed',
    type: 'mysql',
    logging: true,
    host: process.env.masterDBHost,
    port: process.env.masterDBPort,
    username: process.env.masterDBUsername,
    password: process.env.masterDBPassword,
    database: process.env.dbSchema,
    entities: [ 'src/entity/*.ts' ],
    migrations: [ 'src/seeds/*.ts' ],
    cli: {
    migrationsDir: 'src/seeds',
  },
}];
