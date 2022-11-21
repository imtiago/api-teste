import {
    HttpContextContract
} from "@ioc:Adonis/Core/HttpContext";
import Logger from "@ioc:Adonis/Core/Logger";
import User from "App/Models/User";
import StoreUserValidator from "App/Validators/StoreUserValidator";
import FindUserByIdValidator from "App/Validators/FindUserByIdValidator";
import DeleteUserValidator from "App/Validators/user/DeleteUserValidator";

export default class UsersController {
    public async signIn({
        auth, request, response
    }: HttpContextContract) {
        Logger.info("Sign-in");

        try {

            const {
                email,
                password
            } = request.all()
            const user = await auth.use("api").verifyCredentials(email, password);

            const token = await auth.use("api").generate(user);
            return token;
        } catch {
            return response.unauthorized("Invalid credentials");
        }
    }
    public async logout({
        auth
    }: HttpContextContract) {
        Logger.info("logout User");
        await auth.use("api").revoke();
        return {
            revoked: true,
        };
    }
    public async store({
        request, response
    }: HttpContextContract) {
        Logger.info("Store User");
        const userData =
        await request.validate(StoreUserValidator);

        const user = await User.create(userData);

        return response.created(user);
    }
    public async findById({
        request, response
    }: HttpContextContract) {
        Logger.info("Find User By Id");
        const {
            id
        } = await request.validate(FindUserByIdValidator);
        const user = await User.findBy("id", id);
        return response.ok(user);
    }
    public async index({
        response
    }: HttpContextContract) {
        Logger.info("index of Users");
        const users = await User.all();
        return response.ok(users);
    }

    public async delete({
        request, response
    }: HttpContextContract) {
        Logger.info("Delete User");
        const {
            userId
        } = await request.validate(DeleteUserValidator);

        const userDeleted = await User.findOrFail(userId);
        await userDeleted.delete();

        return response.ok("user deleted success");
    }
}