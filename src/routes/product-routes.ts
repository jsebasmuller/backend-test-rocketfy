import { Router } from "express";
import { 
    create, 
    drop, 
    filter, 
    getProductById, 
    update
} from '../controllers/product-controller';

class Routes {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get('/get/:id', getProductById);
        this.router.get('/filter', filter);  
        this.router.post('/create', create);   
        this.router.delete('/delete/:id', drop);
        this.router.put('/update', update);
    }
}

const routes = new Routes();
export default routes.router;