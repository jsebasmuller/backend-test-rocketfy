"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const const_1 = require("../const/const");
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String },
    sku: { type: String, required: true, unique: true },
    image: { type: String, default: const_1.imageDefault },
    tags: { type: [String] },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    history: { type: [{
                date: Date,
                price: Number,
                stock: Number
            }] },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
});
productSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});
productSchema.index({ '$**': 'text' });
exports.Product = (0, mongoose_1.model)("Product", productSchema);
//# sourceMappingURL=product.js.map