import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {MdDialog, MdDialogRef} from '@angular/material';

import { ValidationService } from "../../services/validation.service";
import { CustomerTypeService } from "../../services/customer-type.service"
import { CustomerForm } from "../../model/customer-form.model";
import { CustomerService } from "../../services/customer.service";
import { REGISTER_CONFIRM_MESSAGE, BACK_CONFIRM_MESSAGE,PAGE_FROM_OHTER,PAGE_FROM_NEW } from "../../config/config";
import { DialogComponent } from "../tools/dialog/dialog.component";

let saveConfirmMessage = REGISTER_CONFIRM_MESSAGE;
let backConfirmMessage = BACK_CONFIRM_MESSAGE;
let allSearch = PAGE_FROM_NEW;
let beforeSearch = PAGE_FROM_OHTER;

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})

export class RegisterFormComponent implements OnInit {
  public myForm: FormGroup;

  customerId:number;
  customer: CustomerForm;
  messages:any;
  types:any;
  formErrors:any;

  constructor(private _fb: FormBuilder,private route: ActivatedRoute, public dialog: MdDialog,
    private router: Router, private service: CustomerService, private typeService: CustomerTypeService) { }

  ngOnInit() {
    //FormGroupを初期化
    this.myForm = this._fb.group(this.initCustomerModel(null));

    //カスタマの種別情報
    this.typeService.findAll().then(data => this.types = data).catch(handleError);
  }

  resetData(){
    this.myForm = this._fb.group(this.initCustomerModel(null));
  }

  doBack(model){

    //入力したデーターがあるかチェック
    let changedData = false;
    for(let prop in model) {
      if(model[prop]){
        changedData = true;
        break;
      }
    }

    if(changedData === true) {
      let dialogRef = this.dialog.open(DialogComponent);
      let instance = dialogRef.componentInstance;
      instance.messageString = backConfirmMessage;

      dialogRef.afterClosed().subscribe(result => {
        if(result === true) {
          this.router.navigateByUrl('/search/'+ beforeSearch);
        }
      });
    }else{
      this.router.navigateByUrl('/search/' + beforeSearch);
    }
  }

  /**
   * CustomerFormでフォムを設定、ない場合に全アイテムを''に
   */
  initCustomerModel(data:any){
      if(data) {
        //this.typeId = data.typeId;
        return {
          id: data.id,
          fullName: [data.fullName, Validators.required],
          address: [data.address, Validators.required],
          postalCode: [data.postalCode, [Validators.required, ValidationService.postcodeValidator]],
          phoneNumber:[data.phoneNumber,[Validators.required, ValidationService.phonenumberValidator]],
          mailAddress:[data.mailAddress,[ValidationService.emailValidator]],
          typeId:[data.typeId,Validators.required]
        };
      }else {
        return {
          fullName: ['', Validators.required],
          address: ['', Validators.required],
          postalCode: ['', [Validators.required, ValidationService.postcodeValidator]],
          phoneNumber:['', [Validators.required, ValidationService.phonenumberValidator]],
          mailAddress:['',[ ValidationService.emailValidator]],
          typeId:['',Validators.required]
        };
      }
  }

  /**
   * データー保存処理
   */
  save(model: CustomerForm, isValid: boolean) {
    //確認のダイアログ
    let dialogRef = this.dialog.open(DialogComponent);
    let instance = dialogRef.componentInstance;
    instance.messageString = saveConfirmMessage;

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      //データーを保存
      if(result === true) {
          this.service.save(model).then(res=>this.router.navigateByUrl('/search/' + allSearch));
      }
      //this.selectedOption = result;
    });
  }
}

function handleError(error: any){
    // log error
    let errorMsg = error.message || `RegisterFormComponentThere was was a problem with our hyperdrive device and we couldn't retrieve your data!`
    console.error(errorMsg);
    // instead of Observable we return a rejected Promise
    return Promise.reject(errorMsg);
}
