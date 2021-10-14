import { Router } from 'express';

export interface Routes {
  version?: string;
  path?: string;
  router: Router;
}
