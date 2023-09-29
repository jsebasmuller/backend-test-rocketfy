import { Schema, model } from 'mongoose';
import { imageDefault } from '../const/const';

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    sku: { type: String, required: true, unique: true },
    image: { type: String, default: imageDefault },
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
productSchema.index({'$**': 'text'});
export const Product = model("Product", productSchema);