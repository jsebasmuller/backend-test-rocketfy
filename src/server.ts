import express, { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import productRouter from './routes/product-routes';
import bodyParser from 'body-parser';

export class Server {
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        this.app.set('port', process.env.PORT ?? 3000);
        //middlewares
        this.app.use(morgan('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended:false}));
        this.app.use(helmet());
        const cors = process.env.HOST ?? '*';
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', cors);
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });
    }

    routes() {
        this.app.use('/api/product', productRouter);
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server is listenning on port', this.app.get('port'));
        });
    }
}