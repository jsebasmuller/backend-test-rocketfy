import { ProductDTO } from "../dto/product-dto";

export interface ProductPagination {
    pagination: Pagination;
    products: ProductDTO[];
}

interface Pagination {
    page: number;
    totalPages: number;
    totalResults: number;
}