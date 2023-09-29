import { ProductDTO, ProductFilter } from '../dto/product-dto';
import { ProductPagination } from '../utils/paginator';
import { Product } from '../models/product';

export async function createProduct(productDTO: ProductDTO): Promise<ProductDTO> {
    const product = new Product(productDTO);
    return (await product.save()).toObject();
}

export async function getById(id: string): Promise<ProductDTO | null> {
    const product = await Product.findById(id);
    if (product) {
        return product as ProductDTO;
    } 
    return null
}

export async function filterProducts(filters: ProductFilter): Promise<ProductPagination> {
    const sortBy = filters.sortBy ?? "createdAt";
    const sort = filters.sort ?? "desc";
    const page = filters.page ?? 1;
    let products
    let totalProducts = 0;
    const arrayFilter: any[] = [];

    if (filters.search) {
        arrayFilter.push({
            $text: { $search: filters.search }
        });
    }

    if (filters.minPrice && filters.maxPrice) {
        arrayFilter.push({
            price: { $gte: filters.minPrice, $lte: filters.maxPrice }
        });
    } else if (filters.minPrice) {
        arrayFilter.push({
            price: { $gte: filters.minPrice }
        });
    } else if (filters.maxPrice) {
        arrayFilter.push({
            price: { $lte: filters.maxPrice }
        });
    }

    if (filters.minStock && filters.maxStock) {
        arrayFilter.push({
            stock: { $gte: filters.minStock, $lte: filters.maxStock }
        });
    } else if (filters.minStock) {
        arrayFilter.push({
            stock: { $gte: filters.minStock }
        });
    } else if (filters.maxStock) {
        arrayFilter.push({
            stock: { $lte: filters.maxStock }
        });
    }

    if (arrayFilter.length > 0) {
        console.log('array', arrayFilter)
        products = await Product.find(
        {
            $and: arrayFilter,
        }
        ).sort({[sortBy]: sort}).skip((page - 1) * 10).limit(10);
        totalProducts = await Product.count({
            $and: arrayFilter,
        });
    } else {
        products = await Product.find().sort({[sortBy]: sort}).skip((page - 1) * 10).limit(10);
        totalProducts = await Product.count({});
    }

    const pagination = {
        page,
        totalPages: Math.ceil(totalProducts / 10),
        totalResults: totalProducts,
    };

    const result = {
        products: products as ProductDTO[],
        pagination
    };

    return result;
}

export async function deleteProduct(id: string): Promise<ProductDTO | null> {
    const product = await Product.findByIdAndDelete(id);

    if (product) {
        return product.toObject();
    } 

    return null;
}

export async function updateProduct(productUpdate: ProductDTO): Promise<ProductDTO | null> {
    const productDB = await getById(productUpdate.id);
    if (productDB != null) {
        productUpdate.history = productDB.history;

        if (productUpdate.stock != productDB.stock || productUpdate.price != productDB.price){
            console.log('primer if')
            productUpdate.history.push({
                price: productDB.price,
                stock: productDB.stock,
                date: new Date()
            });
        }
        productUpdate.updatedAt = new Date();

        const productUpdated = await Product.findByIdAndUpdate(
            productUpdate.id,
            productUpdate,
            { new: true }
        );

        if (productUpdated) {
            console.log('productUpdated', productUpdated)
            return productUpdated.toObject();
        }
    }
    return null;
}