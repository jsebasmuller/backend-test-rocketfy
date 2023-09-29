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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.deleteProduct = exports.filterProducts = exports.getById = exports.createProduct = void 0;
const product_1 = require("../models/product");
function createProduct(productDTO) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = new product_1.Product(productDTO);
        return (yield product.save()).toObject();
    });
}
exports.createProduct = createProduct;
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield product_1.Product.findById(id);
        if (product) {
            return product.toObject();
        }
        return null;
    });
}
exports.getById = getById;
function filterProducts(filters) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const sortBy = (_a = filters.sortBy) !== null && _a !== void 0 ? _a : "createdAt";
        const sort = (_b = filters.sort) !== null && _b !== void 0 ? _b : "desc";
        const page = (_c = filters.page) !== null && _c !== void 0 ? _c : 1;
        let products;
        let totalProducts = 0;
        const arrayFilter = [];
        if (filters.search) {
            arrayFilter.push({
                $text: { $search: filters.search }
            });
        }
        if (filters.minPrice && filters.maxPrice) {
            arrayFilter.push({
                price: { $gte: filters.minPrice, $lte: filters.maxPrice }
            });
        }
        else if (filters.minPrice) {
            arrayFilter.push({
                price: { $gte: filters.minPrice }
            });
        }
        else if (filters.maxPrice) {
            arrayFilter.push({
                price: { $lte: filters.maxPrice }
            });
        }
        if (filters.minStock && filters.maxStock) {
            arrayFilter.push({
                stock: { $gte: filters.minStock, $lte: filters.maxStock }
            });
        }
        else if (filters.minStock) {
            arrayFilter.push({
                stock: { $gte: filters.minStock }
            });
        }
        else if (filters.maxStock) {
            arrayFilter.push({
                stock: { $lte: filters.maxStock }
            });
        }
        if (arrayFilter.length > 0) {
            console.log('array', arrayFilter);
            products = yield product_1.Product.find({
                $and: arrayFilter,
            }).sort({ [sortBy]: sort }).skip((page - 1) * 10).limit(10);
            totalProducts = yield product_1.Product.count({
                $and: arrayFilter,
            });
        }
        else {
            products = yield product_1.Product.find().sort({ [sortBy]: sort }).skip((page - 1) * 10).limit(10);
            totalProducts = yield product_1.Product.count({});
        }
        const pagination = {
            page,
            totalPages: Math.ceil(totalProducts / 10),
            totalResults: totalProducts,
        };
        const result = {
            products: products,
            pagination
        };
        return result;
    });
}
exports.filterProducts = filterProducts;
function deleteProduct(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield product_1.Product.findByIdAndDelete(id);
        if (product) {
            return product.toObject();
        }
        return null;
    });
}
exports.deleteProduct = deleteProduct;
function updateProduct(productUpdate) {
    return __awaiter(this, void 0, void 0, function* () {
        const productDB = yield getById(productUpdate.id);
        if (productDB != null) {
            productUpdate.history = productDB.history;
            if (productUpdate.stock != productDB.stock || productUpdate.price != productDB.price) {
                console.log('primer if');
                productUpdate.history.push({
                    price: productDB.price,
                    stock: productDB.stock,
                    date: new Date()
                });
            }
            productUpdate.updatedAt = new Date();
            const productUpdated = yield product_1.Product.findByIdAndUpdate(productUpdate.id, productUpdate, { new: true });
            if (productUpdated) {
                console.log('productUpdated', productUpdated);
                return productUpdated.toObject();
            }
        }
        return null;
    });
}
exports.updateProduct = updateProduct;
//# sourceMappingURL=product-services.js.map