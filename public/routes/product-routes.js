"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product-controller");
class Routes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get('/get/:id', product_controller_1.getProductById);
        this.router.get('/filter', product_controller_1.filter);
        this.router.post('/create', product_controller_1.create);
        this.router.delete('/delete/:id', product_controller_1.drop);
        this.router.put('/update', product_controller_1.update);
    }
}
const routes = new Routes();
exports.default = routes.router;
//# sourceMappingURL=product-routes.js.map