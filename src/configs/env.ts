import dotenv, { DotenvConfigOptions } from 'dotenv';
import { toNumber } from '@utils/util';

const getStringEnv = (key: string): string => {
  return process.env[key];
};
const getNumberEnv = (key: string): number => {
  return toNumber(getStringEnv(key));
};
const getBooleanEnv = (key: string): boolean => {
  const value = process.env[key] || '';
  return value.toLowerCase() === 'true';
}

export interface IEnv {
  readonly port: number;
  readonly nodeEnv: string;
  readonly dbType: string;
  readonly dbSchema: string;
  readonly dbTlsEnable: boolean;
  readonly dbTlsCAPath: string;
  readonly masterDBHost: string;
  readonly masterDBPassword: string;
  readonly masterDBPort: number;
  readonly masterDBUsername: string;
  readonly slaveDBHost: string;
  readonly slaveDBPassword: string;
  readonly slaveDBPort: number;
  readonly slaveDBUsername: string;
  readonly secretKey: string;
  readonly logFormat: string;

  readonly isProduction: boolean;
  readonly isStage: boolean;
  readonly isDevelopment: boolean;
  readonly isTest: boolean;
}

const envOption: DotenvConfigOptions = {};
if (process.env.NODE_ENV === 'test') {
  envOption.path = '../.env.test';
}
dotenv.config(envOption);

function getEnv(): IEnv {
  return {
    port: getNumberEnv('PORT') || 3000,
    nodeEnv: getStringEnv('NODE_ENV') || 'development',
    isTest: getBooleanEnv('IS_TEST') || false,
    dbType: getStringEnv('DB_TYPE') || 'mysql',
    dbSchema: getStringEnv('DB_SCHEMA') || 'js',
    dbTlsEnable: getBooleanEnv('DB_TLS_ENABLE'),
    dbTlsCAPath: getStringEnv('DB_TLS_CA_PATH') || '/tls/ca.pem',
    masterDBHost: getStringEnv('MASTER_DB_HOST') || 'localhost',
    masterDBPort: getNumberEnv('MASTER_DB_PORT') || 3306,
    masterDBUsername: getStringEnv('MASTER_DB_USERNAME') || 'root',
    masterDBPassword: getStringEnv('MASTER_DB_PASSWORD') || 'password',
    slaveDBHost: getStringEnv('SLAVE_DB_HOST') || 'localhost',
    slaveDBPort: getNumberEnv('SLAVE_DB_PORT') || 3306,
    slaveDBUsername: getStringEnv('SLAVE_DB_USERNAME') || 'root',
    slaveDBPassword: getStringEnv('SLAVE_DB_PASSWORD') || 'password',
    secretKey: getStringEnv('SECRET_KEY') || 'local',
    logFormat: getStringEnv('LOG_FORMAT') || 'dev',

    isProduction: getStringEnv('NODE_ENV') === 'production',
    isStage: getStringEnv('NODE_ENV') === 'stage',
    isDevelopment: getStringEnv('NODE_ENV') === 'development',
  };
}

export const env = getEnv();
