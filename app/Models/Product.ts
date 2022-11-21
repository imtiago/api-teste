import { DateTime } from "luxon";
import {
  beforeCreate,
  column,
  computed,
} from "@ioc:Adonis/Lucid/Orm";
import { v4 as uuidv4 } from "uuid";
import AppBaseModel from "./AppBaseModel";
export default class Product extends AppBaseModel {
  public static selfAssignPrimaryKey = true;

  @column({ isPrimary: true })
  public id: string;

  @column()
  public name: string;

  @column()
  public price: number;
  
  @column()
  public percent: number;

  @column()
  public details: string;
  
  @column()
  public address: string;

  @column()
  public isAvailable: boolean;

  @column()
  public image: string;
  
  //Computer Props
  @computed()
  public get saleValue(): number {
    return this.price + (this.price*this.percent)/100;
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  //hooks
  @beforeCreate()
  public static assignUuid(product: Product) {
    product.id = uuidv4();
    product.isAvailable = true;
  }
}
