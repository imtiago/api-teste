import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Logger from "@ioc:Adonis/Core/Logger";
import UpdatePasswordValidator from "App/Validators/profile/UpdatePasswordValidator";
import UpdateProfileValidator from "App/Validators/profile/UpdateProfileValidator";

export default class ProfilesController {
  public async getMyAccount({ auth, response }: HttpContextContract) {
    Logger.info("GetMyAccount");
    try {
      const user = auth.user;
      return response.ok(user);
    } catch {}
  }
  public async update({ request, auth, response }: HttpContextContract) {
    Logger.info("Update Profile");
    const profileData = await request.validate(
      UpdateProfileValidator
    );
    const user = auth.user;
    if (user) {
      await user?.merge(profileData).save();
      return response.ok(user);
    }
  }
  public async updatePassword({
    request,
    auth,
    response,
  }: HttpContextContract) {
    Logger.info("Update Password Profile");
    const { password, newPassword } = await request.validate(
      UpdatePasswordValidator
    );
    const user = auth.user;
    if (user) {
      await auth.use("api").verifyCredentials(user.email, password);
      await user?.merge({ password: newPassword }).save();
      return response.ok({});
    }
  }
}
