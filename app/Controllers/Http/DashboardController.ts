import {
    HttpContextContract
} from "@ioc:Adonis/Core/HttpContext";
import Logger from "@ioc:Adonis/Core/Logger";
import Product from "App/Models/Product";

export default class DashboardController {
    public async info({
        response
    }: HttpContextContract) {
        Logger.info("Informations to dashboard about system");

        const products = await Product.all();
        // console.log(products)
        const productsAvailables =
        products.filter(product=> {
            if (product.isAvailable)
                return product
        }
        );

        const dashboardInformations = {
            allProperties: products.length,
            soldProperties: products.length - productsAvailables.length,
            pendingProperties: productsAvailables.length
        };
        return response.ok(dashboardInformations);
    }
}