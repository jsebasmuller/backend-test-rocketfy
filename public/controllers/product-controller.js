"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.drop = exports.filter = exports.getProductById = exports.create = void 0;
const product_services_1 = require("../services/product-services");
const validator_1 = __importDefault(require("validator"));
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const productBody = req.body;
        try {
            const nameValidator = !validator_1.default.isEmpty(productBody.name);
            const skuValidator = !validator_1.default.isEmpty(productBody.sku);
            const priceValidator = !validator_1.default.isEmpty(productBody.price.toString()) && validator_1.default.isNumeric(productBody.price.toString());
            const stockValidator = !validator_1.default.isEmpty(productBody.stock.toString()) && validator_1.default.isNumeric(productBody.stock.toString());
            if (nameValidator && skuValidator && priceValidator && stockValidator) {
                const product = yield (0, product_services_1.createProduct)(productBody);
                res.status(201).json(product);
            }
            else {
                res.status(400).send({
                    message: 'Los datos no son válidos'
                });
            }
        }
        catch (err) {
            res.status(500).send({
                message: 'Ha ocurrido un error inesperado'
            });
        }
    });
}
exports.create = create;
function getProductById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const validateId = !validator_1.default.isNumeric(id) && validator_1.default.isHexadecimal(id);
            if (validateId) {
                const product = yield (0, product_services_1.getById)(id);
                if (product != null) {
                    res.status(200).json(product);
                }
                else {
                    res.status(404).send({
                        message: 'Producto no encontrado'
                    });
                }
            }
            else {
                res.status(400).send({
                    message: 'El id que estas enviando es inválido'
                });
            }
        }
        catch (error) {
            res.status(500).send({
                message: 'Ha ocurrido un error inesperado'
            });
        }
    });
}
exports.getProductById = getProductById;
function filter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const filter = req.query;
        try {
            const products = yield (0, product_services_1.filterProducts)(filter);
            res.status(200).json(products);
        }
        catch (err) {
            console.log(err);
            res.status(500).send({
                message: 'Ha ocurrido un error inesperado'
            });
        }
    });
}
exports.filter = filter;
function drop(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const validateId = !validator_1.default.isNumeric(id) && validator_1.default.isHexadecimal(id);
            if (validateId) {
                const product = yield (0, product_services_1.deleteProduct)(id);
                if (product != null) {
                    res.status(200).json(product);
                }
                else {
                    res.status(404).send({
                        message: 'Producto no encontrado'
                    });
                }
            }
            else {
                res.status(400).send({
                    message: 'El id que estas enviando es inválido'
                });
            }
        }
        catch (error) {
            res.status(500).send({
                message: 'Ha ocurrido un error inesperado'
            });
        }
    });
}
exports.drop = drop;
function update(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const productBody = req.body;
        try {
            const nameValidator = !validator_1.default.isEmpty(productBody.name);
            const skuValidator = !validator_1.default.isEmpty(productBody.sku);
            const priceValidator = !validator_1.default.isEmpty(productBody.price.toString()) && validator_1.default.isNumeric(productBody.price.toString());
            const stockValidator = !validator_1.default.isEmpty(productBody.stock.toString()) && validator_1.default.isNumeric(productBody.stock.toString());
            if (nameValidator && skuValidator && priceValidator && stockValidator) {
                const product = yield (0, product_services_1.updateProduct)(productBody);
                if (product != null) {
                    res.status(200).json(product);
                }
                else {
                    res.status(404).send({
                        message: 'Producto a actualizar no encontrado'
                    });
                }
            }
            else {
                res.status(400).send({
                    message: 'Los datos no son válidos'
                });
            }
        }
        catch (err) {
            res.status(500).send({
                message: 'Ha ocurrido un error inesperado'
            });
        }
    });
}
exports.update = update;
//# sourceMappingURL=product-controller.js.map