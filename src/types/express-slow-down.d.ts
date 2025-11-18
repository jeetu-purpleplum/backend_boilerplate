declare module 'express-slow-down' {
  import { Request, RequestHandler, Response } from 'express';

  interface Options {
    windowMs?: number;
    delayAfter?: number;
    delayMs?: number | ((req: Request, res: Response) => number);
    maxDelayMs?: number;
    skipFailedRequests?: boolean;
    skipSuccessfulRequests?: boolean;
    requestWasSuccessful?: (req: Request, res: Response) => boolean;
    keyGenerator?: (req: Request, res: Response) => string;
    skip?: (req: Request, res: Response) => boolean;
    onLimitReached?: (req: Request, res: Response, optionsUsed: Options) => void;
    headers?: boolean;
    draft_polli_ratelimit_headers?: boolean;
  }

  function slowDown(options?: Options): RequestHandler;

  export = slowDown;
}
