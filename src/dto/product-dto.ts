import { SortOrder } from "mongoose";

export interface ProductDTO {
    id: string;
    name: string;
    description: string;
    sku: string;
    image: string;
    tags: string[];
    price: number;
    stock: number;
    history: ProductHistory[];
    createdAt: Date;
    updatedAt: Date;
}

export interface ProductHistory {
    date: Date;
    price: number | null;
    stock: number | null;
}

export interface ProductFilter {
    search: string;
    minStock: number;
    maxStock: number;
    minPrice: number;
    maxPrice: number;
    sort: SortOrder;
    sortBy: string;
    page: number;
}