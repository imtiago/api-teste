import {
    HttpContextContract
} from "@ioc:Adonis/Core/HttpContext";
import Logger from "@ioc:Adonis/Core/Logger";
import Product from "App/Models/Product";
import StoreProductValidator from "App/Validators/product/StoreProductValidator";
import FindProductByIdValidator from "App/Validators/product/FindProductByIdValidator";
//import DeleteProductValidator from "App/Validators/product/DeleteProductValidator";

export default class ProductsController {
    public async store({
        request, response
    }: HttpContextContract) {
        Logger.info("Store Product");
        const productData = await request.validate(StoreProductValidator);
        console.log(productData)
        const product = await Product.create(productData);
        if (!product) return response.created(product);
        return response.created(product);
    }

    public async index({
        response
    }: HttpContextContract) {
        Logger.info("index of Products");


        const products = await Product.all();

        /* const products = [{
        id: "1",
        name: 'casa',
        address: 'rua A, n633, bairro vila nova',
        details: "casa com 4 quartos, uma sala, e dois banheiros",
        price: 30000,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ89VZQCAcmdHnFvcC38IVUBNnonQVDQPzVlw&usqp=CAU"
    },
        {
            id: "2",
            name: 'apartamento',
            address: 'rua jesse, n533, bairro sao jose',
            details: "apartamento novo",
            price: 60000,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlelpo16QgEbTw1jo6CsHvbBwbULxX8pcdiQ&usqp=CAU"
        }];*/
        return response.ok(products);
    }

    public async findById({
        request, response
    }: HttpContextContract) {
        const {
            id
        } = await request.validate(FindProductByIdValidator);
        Logger.info("Find Product of Id");
        const product = await Product.findBy("id", id);;
        return response.ok(product);
    }

    public async delete({
        request, response
    }: HttpContextContract) {
        Logger.info("Delete Product");
        const
        productId = request.param('id');
       // console.log(productId)
        /*await request.validate(DeleteProductValidator);*/

        const productDeleted = await Product.findOrFail(productId);
        await productDeleted.delete();

        return response.ok("product deleted success");
    }
    public async updateStatus({
        request, response
    }: HttpContextContract) {
        Logger.info("update status Product");
        const
        productId = request.param('id');
       // console.log(productId)
        /*await request.validate(DeleteProductValidator);*/

        const product = await Product.findOrFail(productId);
        product.isAvailable = false;
        await product.save();

        return response.ok("product updated sucess success");
    }
    public async getUrls({
        response
    }: HttpContextContract) {
        Logger.info("urls images");
        const urls = [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlelpo16QgEbTw1jo6CsHvbBwbULxX8pcdiQ&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ89VZQCAcmdHnFvcC38IVUBNnonQVDQPzVlw&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRijMficvVkEUo7WzpD-0WWSwM_Dyw2PD31eA&usqp=CAU"
        ];
        return response.ok(urls);
    }
}