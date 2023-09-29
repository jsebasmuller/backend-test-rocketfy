import { Request, Response } from "express";
import { 
    createProduct, 
    deleteProduct, 
    filterProducts, 
    getById, 
    updateProduct
} from "../services/product-services";
import { ProductDTO, ProductFilter } from "../dto/product-dto";
import validator from 'validator';

export async function create (req: Request, res: Response): Promise<void> {
    const productBody: ProductDTO = req.body;
    
    try{
        const nameValidator = !validator.isEmpty(productBody.name);
        const skuValidator = !validator.isEmpty(productBody.sku);
        const priceValidator = !validator.isEmpty(productBody.price.toString()) && validator.isNumeric(productBody.price.toString());
        const stockValidator = !validator.isEmpty(productBody.stock.toString()) && validator.isNumeric(productBody.stock.toString());

        if (nameValidator && skuValidator && priceValidator && stockValidator){
            const product = await createProduct(productBody);
            res.status(201).json(product);
        } else {
            res.status(400).send({
                message: 'Los datos no son válidos'
            });
        }
    }catch(err){
        res.status(500).send({
            message: 'Ha ocurrido un error inesperado'
        });
    }
}

export async function getProductById (req: Request, res: Response): Promise<void> {
    const id = req.params.id;

    try {
        const validateId = !validator.isNumeric(id) && validator.isHexadecimal(id);
        if (validateId) {
            const product = await getById(id);
            if (product != null) {
                res.status(200).json(product);
            } else {
                res.status(404).send({
                    message: 'Producto no encontrado'
                })
            }
        } else {
            res.status(400).send({
                message: 'El id que estas enviando es inválido'
            })
        }
    } catch(error) {
        res.status(500).send({
            message: 'Ha ocurrido un error inesperado'
        });
    }
}

export async function filter (req: Request, res: Response): Promise<void> {
    const filter = req.query as unknown as ProductFilter;
    
    try {
        const products = await filterProducts(filter);
        res.status(200).json(products);
    } catch(err) {
        console.log(err)
        res.status(500).send({
            message: 'Ha ocurrido un error inesperado'
        });
    }
}

export async function drop (req: Request, res: Response): Promise<void> {
    const id = req.params.id;

    try {
        const validateId = !validator.isNumeric(id) && validator.isHexadecimal(id);
        if (validateId) {
            const product = await deleteProduct(id);
            if (product != null) {
                res.status(200).json(product);
            } else {
                res.status(404).send({
                    message: 'Producto no encontrado'
                })
            }
        } else {
            res.status(400).send({
                message: 'El id que estas enviando es inválido'
            })
        }
    } catch(error) {
        res.status(500).send({
            message: 'Ha ocurrido un error inesperado'
        });
    }
}

export async function update (req: Request, res: Response): Promise<void> {
    const productBody: ProductDTO = req.body;
    
    try{
        const nameValidator = !validator.isEmpty(productBody.name);
        const skuValidator = !validator.isEmpty(productBody.sku);
        const priceValidator = !validator.isEmpty(productBody.price.toString()) && validator.isNumeric(productBody.price.toString());
        const stockValidator = !validator.isEmpty(productBody.stock.toString()) && validator.isNumeric(productBody.stock.toString());

        if (nameValidator && skuValidator && priceValidator && stockValidator){
            const product = await updateProduct(productBody);
            if (product != null) {
                res.status(200).json(product);
            } else {
                res.status(404).send({
                    message: 'Producto a actualizar no encontrado'
                });
            }

        } else {
            res.status(400).send({
                message: 'Los datos no son válidos'
            });
        }
    }catch(err){
        res.status(500).send({
            message: 'Ha ocurrido un error inesperado'
        });
    }
}
