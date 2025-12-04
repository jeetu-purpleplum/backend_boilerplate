import express, { Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { rateLimiter, speedLimiter } from './middlewares/rateLimiter';
import { logger, requestInfo } from './utils/logger';
import { config } from './config/config';
import cluster from 'cluster';
import primaryConnection from './utils/db';
import { Model } from 'objection';
import multer from 'multer';
import routes from './routes'
import { setupSwagger } from './config/swagger.config';
// import { connectKafka } from './lib/kafka';
// import { registerKafkaConsumers } from './lib/consumer';

const numCPUs = 1;
const upload = multer();

if (cluster.isPrimary) {
    // create a worker for each CPU
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on("online", (worker) => {
        logger.info(`worker online, worker id: ${worker.id}`);
    });
    //if worker dies, create another one
    cluster.on("exit", (worker, code, signal) => {
        logger.error(`worker died, worker id: ${worker.id} | signal: ${signal} | code: ${code}`);
        cluster.fork();
    });
} else {

    const app: express.Express = express();

    app.use(cors());
    app.use(helmet());

    // Logging – record everything
    app.use(requestInfo);

    
    // // Connection Throttling (Throttle connections by limiting the number of concurrent requests from a single IP.
    app.use(speedLimiter);
    // Rate Limiting (Use a rate limiter to restrict the number of requests from a single IP address over a specific time period.)
    app.use(rateLimiter);
    
    // Limit Payload Size (Restrict the maximum payload size to prevent attackers from sending large requests that consume resources.
    app.use(express.json({ limit: "1mb" }));

    // for parsing multipart/form-data
    app.use(upload.none());

    // Application routes
    app.use("/api", routes);

    // Swagger docs setup
    setupSwagger(app);


    // Not found(404) route handler
    app.all("*", (req: Request, res: Response) : void => {
        res.status(404).send({
            error: true,
            status: 404,
            message: "Route doesn't exists.",
            data: {},
        });
    });


    app.listen(config.port, async function () {
        const workerId = cluster.worker && cluster.worker.id ? cluster.worker.id : undefined;
        logger.info(`worker started: ${workerId} | server listening on port: ${config.port}`);

        // DB Connection 
        Model.knex(primaryConnection);

        // KAFKA CONNECTION
        // await connectKafka();
        // await registerKafkaConsumers();
    });

}
