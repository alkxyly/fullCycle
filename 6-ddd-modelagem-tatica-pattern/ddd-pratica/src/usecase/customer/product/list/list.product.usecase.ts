import Product from "../../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../../domain/product/repository/product-repository.interface";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export default class ListProductUseCase{
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface){
        this.productRepository = productRepository;
    }

    async execute(input: InputListProductDto): Promise<Product[]>{
        const products = await this.productRepository.findAll();
        return products;
    }
}