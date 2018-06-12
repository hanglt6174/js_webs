import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { ValidationService } from "../../services/validation.service";
import { CustomerTypeService } from "../../services/customer-type.service"
import { CustomerForm } from "../../model/customer-form.model";
import { CustomerService } from "../../services/customer.service";
import { PAGE_FROM_OHTER } from "../../config/config";
let beforeSearch = PAGE_FROM_OHTER;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.styl']
})
export class DetailComponent implements OnInit {
  public myForm: FormGroup;
  
  customerId:number;
  customer: CustomerForm;
  typeName:any;

  constructor(private _fb: FormBuilder,private route: ActivatedRoute,
    private router: Router, private service: CustomerService, private typeService: CustomerTypeService) { }

  ngOnInit() {
    console.log(this.route.snapshot.params);
    this.customerId = this.route.snapshot.params['id']|| null;

    //FormGroupを初期化
    this.customer = new CustomerForm();

    //apiからデータを取得
    this.service.findById(this.customerId).then(
                                                customer => {
                                                              this.customer = customer;
                                                            }
                                                )
    .catch(handleError);

    //カスタマーの種別名取得
    this.service.getType(this.customerId).then(
                                    typeItem => {
                                      this.typeName = typeItem.name;
                                          }
                                    )
    .catch(handleError);
  }

  /**
   * カスタマー検索一覧画面に戻る
   */
  returnSearch(){
    this.router.navigateByUrl('/search/' + beforeSearch);
  }

  /**
   * 変更画面に遷移
   */
  goModify(id){
    this.router.navigateByUrl('/modify/' + id);
  }
}
/**
 * デブグ用
 * APIに接続した時にエラー内容を見れるように
 */
function handleError(error: any){
    // log error
    let errorMsg = error.message || `RegisterFormComponentThere was was a problem with our hyperdrive device and we couldn't retrieve your data!`
    console.error(errorMsg);
    // instead of Observable we return a rejected Promise
    return Promise.reject(errorMsg);
}
