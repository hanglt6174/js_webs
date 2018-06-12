import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Http, Headers, RequestOptions } from '@angular/http';

import { CUSTOMER_URL } from "../config/config";

let apiUrl = CUSTOMER_URL;

@Injectable()
export class CustomerService {

  constructor(public http: Http) {}

    findAll() {
        return this.http.get(apiUrl)
            .map(res => res.json())
            .toPromise();
    }

    findById(id){
        return this.http.get(apiUrl + '/' + id)
            .map(res => res.json())
            .toPromise();
    }
    save(customer) {
        let vals = {
                fullName: customer.fullName,
                postalCode:customer.postalCode,
                address:customer.address,
                phoneNumber:customer.phoneNumber,
                mailAddress:customer.mailAddress,
                typeId:customer.typeId
        };
        let body = JSON.stringify(vals),
            headers = new Headers({'Content-Type': 'application/json'}),
            options = new RequestOptions({headers: headers});
        if(customer.id) {
            console.log('put',customer);
            return this.http.put(apiUrl + '/' + customer.id, body, options)
            .map(res => res.json())
            .toPromise();
        }else{
            console.log('post',customer);
            return this.http.post(apiUrl, body, options)
            .map(res => res.json())
            .toPromise();
        }
    }

    getType(customerId){
      return this.http.get(apiUrl + '/' + customerId + '/type')
            .map(res => res.json())
            .toPromise();
    }
    
}

