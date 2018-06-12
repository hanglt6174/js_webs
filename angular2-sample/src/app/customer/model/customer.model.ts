
/**
 * Created by linyizhong on 2017/04/15.
 */
export class Customer{

  public id:string;
  public fullName:string;
  public address:string;
  public postalCode:string;
  public phoneNumber:string;
  public mailAddress:string;
  public typeId:string;
  public typeName:string;

  constructor(){}

  static fromJSON(json: any): Customer {

    let customer = Object.create(Customer.prototype);
    Object.assign(customer, json);
    return customer;
  }
}