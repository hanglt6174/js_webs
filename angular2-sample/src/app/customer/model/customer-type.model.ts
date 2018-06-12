export class CustomerType{

  id:string;
  name:string;
  checked:string;

  constructor(){}

  static fromJSON(json: any): CustomerType {

    let customer = Object.create(CustomerType.prototype);
    Object.assign(customer, json);
    return customer;
  }
}
