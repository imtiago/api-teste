import { DateTime } from "luxon";
import {
  beforeCreate,
  beforeSave,
  column
} from "@ioc:Adonis/Lucid/Orm";
import Hash from "@ioc:Adonis/Core/Hash";
import { v4 as uuidv4 } from "uuid";
import CamelCaseNamingStrategy from "App/Strategies/CamelCaseNamingStrategy";
import AppBaseModel from "./AppBaseModel";

export default class User extends AppBaseModel {
  public static selfAssignPrimaryKey = true;
  public static namingStrategy = new CamelCaseNamingStrategy();

  @column({ isPrimary: true })
  public id: string;

  @column()
  public name: string;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime;

  //hooks
  @beforeCreate()
  public static assignUuid(user: User) {
    user.id = uuidv4();
  }

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }
}
