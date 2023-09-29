"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const product_routes_1 = __importDefault(require("./routes/product-routes"));
const body_parser_1 = __importDefault(require("body-parser"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        var _a, _b;
        this.app.set('port', (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000);
        //middlewares
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        const cors = (_b = process.env.HOST) !== null && _b !== void 0 ? _b : '*';
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', cors);
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });
    }
    routes() {
        this.app.use('/api/product', product_routes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server is listenning on port', this.app.get('port'));
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map