import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Http, Headers, RequestOptions } from '@angular/http';

import { TYPE_URL } from "../config/config";

let apiUrl = TYPE_URL;

@Injectable()
export class CustomerTypeService {

  constructor(public http: Http) { }
  
  findAll() {
      return this.http.get(apiUrl)
            .map(res => res.json())
            .toPromise();
  }
}
