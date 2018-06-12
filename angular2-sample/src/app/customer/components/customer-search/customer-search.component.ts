import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Http } from '@angular/http';

import { CustomerType } from '../../model/customer-type.model';
import { PagingModel, PgeingShow } from '../../model/paging.model';
import { SortingModel } from '../../model/sorting.model';
import { Customer } from '../../model/customer.model';
import { SERVER_URL, PAGE_FROM_NEW } from '../../config/config';
import {isEmpty} from "rxjs/operator/isEmpty";

let urlServer = SERVER_URL;

@Component({
  selector: 'customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./styles.css']
})

export class CustomerSearchComponent implements OnInit {

  customerList: Customer[] = [];
  customerListWhere: Customer[] = [];
  customerTypeList: CustomerType[] = [];

  sortModelList: SortingModel[] = [];

  private iPageCount: number;
  private fromPage: string;
  pagingModel: PagingModel = new PagingModel();
  customerForm: Customer = new Customer();

  constructor(private http: Http,private route: ActivatedRoute, private router: Router) {}

  //画面初期化の処理
  ngOnInit(): void {

    this.fromPage = this.route.snapshot.params['pFrom']|| '';

    //すべてのカスタマイズタイプを取得する
    this.http.get(urlServer + '/api/customerTypes/').subscribe(res=> this.initDo(res));
  }

  //検索
  customerSearch(): void {

    //取得して、検索処理
    this.http.get(this.searchUrl()).subscribe(res => this.searchDo(res));
    this.clearFormCookie();
    this.setFormCookie();
  }

  //pagingクリックの処理
  pagingClick(pageTxt: string): void {

    if (pageTxt == '<<') {pageTxt = '1'; }
    if (pageTxt == '>>') {pageTxt = this.iPageCount.toString(); }

    for (let pagingShow of this.pagingModel.pageShowArry) {
      pagingShow.pageingCss = '';
      if (pageTxt == pagingShow.pageingShow) {
        pagingShow.pageingCss = 'active';
      }
    }
    this.showData(Number(pageTxt));
  }

  //詳細画面
  detail(uerId: string): void {

    this.router.navigateByUrl('/detail/'+ uerId);
  }

  //新規画面
  new(): void {

    this.router.navigateByUrl('/register');
  }

  //headクリックのソート処理
  sortByHead(head: string): void {
    let tempModel = '';

    for (let sortModel of this.sortModelList) {

      if(head == sortModel.colName) {

        tempModel = sortModel.shortType;

        if('up' == sortModel.shortType){
          sortModel.shortType = 'down';
        }else{
          sortModel.shortType = 'up';
        }
      }else{
        sortModel.shortType = 'up';
      }
    }
    //ソート
    function dynamicSort(property, orderU: string) {

      let sortOrder: number;
      sortOrder = 1;
      if (property[0] === '-') {
        sortOrder = -1;
        property = property.substr(1);
      }
      return function (a,b) {
        let result: number;
        if('up' == orderU) {
          result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        }
        else {
          result = (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
        }
        return result * sortOrder;
      }
    }
    this.customerListWhere.sort(dynamicSort(head, tempModel));

    //dataの初期化
    this.pagingClick('1');
  }

  //画面設定 cookieより
  private setFormByCookie(){

    this.customerForm.fullName = decodeURIComponent(this.getCookie('fullName'));
    this.customerForm.address = decodeURIComponent(this.getCookie('address'));
    this.customerForm.postalCode = decodeURIComponent(this.getCookie('postalCode'));
    this.customerForm.phoneNumber = decodeURIComponent(this.getCookie('phoneNumber'));
    this.customerForm.mailAddress = decodeURIComponent(this.getCookie('mailAddress'));

    for (let cType of this.customerTypeList) {
      cType.checked = this.getCookie('typeId' + cType.id);
    }
  }

  //画面条件のクリア
  private clearForm(){

    this.customerForm.fullName = '';
    this.customerForm.address = '';
    this.customerForm.postalCode = '';
    this.customerForm.phoneNumber = '';
    this.customerForm.mailAddress = '';

    for (let cType of this.customerTypeList) {
      cType.checked = '';
    }
  }

  //Cookieの設定
  private setFormCookie(){

    if(!this.isEmpty(this.customerForm.fullName)){
      document.cookie = 'fullName=' + encodeURIComponent(this.customerForm.fullName) + '; max-age=1800';
    }else{
      document.cookie = 'fullName=; max-age=1800';
    }
    if(!this.isEmpty(this.customerForm.address)){
      document.cookie = 'address=' + encodeURIComponent(this.customerForm.address) + '; max-age=1800';
    }else{
      document.cookie = 'address=; max-age=1800';
    }
    if(!this.isEmpty(this.customerForm.postalCode)){
      document.cookie = 'postalCode=' + encodeURIComponent(this.customerForm.postalCode) + '; max-age=1800';
    }else{
      document.cookie = 'postalCode=; max-age=1800';
    }
    if(!this.isEmpty(this.customerForm.phoneNumber)){
      document.cookie = 'phoneNumber=' + encodeURIComponent(this.customerForm.phoneNumber) + '; max-age=1800';
    }else{
      document.cookie = 'phoneNumber=; max-age=1800';
    }
    if(!this.isEmpty(this.customerForm.mailAddress)){
      document.cookie = 'mailAddress=' + encodeURIComponent(this.customerForm.mailAddress) + '; max-age=1800';
    }else{
      document.cookie = 'mailAddress=; max-age=1800';
    }
    for (let cType of this.customerTypeList) {
      document.cookie = 'typeId' + cType.id + '=' + this.getCheckStr(cType.checked) + '; max-age=1800';
    }
  }

  //Cookieの設定
  private clearFormCookie(){

    document.cookie = 'fullName=; max-age=0';
    document.cookie = 'address=; max-age=0';
    document.cookie = 'postalCode=; max-age=0';
    document.cookie = 'phoneNumber=; max-age=0';
    document.cookie = 'mailAddress=; max-age=0';
    for (let cType of this.customerTypeList) {
      document.cookie = 'typeId' + cType.id + '=; max-age=0';
    }
  }

  //Cookieの取得
  private getCookie(cname)
  {
    var name = cname + '=';
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  //検索のurl
  private searchUrl(): string{

    let urlPar: string = '/api/customers';
    let iCountPar: number = 0;

    let tempF=()=>{
      if (iCountPar>0) {
        urlPar+= '&';
      }else{
        urlPar+= '?';
      }
    };

    if (!this.isEmpty(this.customerForm.fullName)) {
      tempF();
      urlPar+= `filter[where][and][${iCountPar}][fullName][ilike]=%25${encodeURIComponent(this.customerForm.fullName.trim())}%25`;
      iCountPar++;
    }

    if (!this.isEmpty(this.customerForm.address)) {
      tempF();
      urlPar+= `filter[where][and][${iCountPar}][address][ilike]=%25${encodeURIComponent(this.customerForm.address.trim())}%25`;
      iCountPar++;
    }

    if (!this.isEmpty(this.customerForm.mailAddress)) {
      tempF();
      urlPar+= `filter[where][and][${iCountPar}][mailAddress][ilike]=%25${encodeURIComponent(this.customerForm.mailAddress.trim())}%25`;
      iCountPar++;
    }

    if (!this.isEmpty(this.customerForm.phoneNumber)) {
      tempF();
      urlPar+= `filter[where][and][${iCountPar}][phoneNumber]=${encodeURIComponent(this.customerForm.phoneNumber.trim())}`;
      iCountPar++;
    }

    if (!this.isEmpty(this.customerForm.postalCode)) {
      tempF();
      urlPar+= `filter[where][and][${iCountPar}][postalCode]=${encodeURIComponent(this.customerForm.postalCode.trim())}`;
      iCountPar++;
    }

    for (let cType of this.customerTypeList) {

      if (this.isCheck(cType.checked)) {
        tempF();
        urlPar+= `filter[where][or][${iCountPar}][typeId]=${cType.id}`;
        iCountPar++;
      }
    }
    return urlServer + urlPar;
  }

  //検索データの処理
  private searchDo(res: any): void {

    this.sortModelList = [new SortingModel('fullName', 'up'), new SortingModel('postalCode', 'up'),
      new SortingModel('address', 'up'), new SortingModel('phoneNumber', 'up'),
      new SortingModel('mailAddress', 'up'), new SortingModel('typeName', 'up') ];
  this.customerListWhere = res.json();
  console.log('search>customerSearch', this.customerListWhere);
  this.setCustomerTypeName();

  //pagingの初期化
  this.setPageCount();

  //dataの初期化
  this.showData(1);
}

  //すべてのカスタマイズタイプを取得する
  private initDo(res: any): void {

    this.customerTypeList = res.json();
    //新規画面、詳細画面から
    if(this.isEmpty(this.fromPage)){
      this.clearFormCookie();
    }
    else if(PAGE_FROM_NEW == this.fromPage){
      this.clearFormCookie();
      this.clearForm();
      this.clearForm();
      this.customerSearch();
    }else{
      this.setFormByCookie();
      this.clearFormCookie();
      this.customerSearch();
    }
  }

  //pageの設定
  private setPageCount(): void {

    this.pagingModel = null;
    this.pagingModel = new PagingModel();

    let iCount: number = 0;
    let iDataCount: number = this.customerListWhere.length;

    if (iDataCount <= this.pagingModel.onePageCount) {
      return;
    }

    this.iPageCount = Math.ceil(iDataCount/this.pagingModel.onePageCount);

    let pgeingShowS: PgeingShow = new PgeingShow();
    pgeingShowS.pageingShow = '<<';
    pgeingShowS.pageingCss = '';

    this.pagingModel.pageShowArry.push(pgeingShowS);

    while (iCount < this.iPageCount) {
      iCount++;
      let pgeingShow: PgeingShow = new PgeingShow();
      pgeingShow.pageingShow = iCount.toString();
      if (iCount == 1) {
        pgeingShow.pageingCss = 'active';
      }
      this.pagingModel.pageShowArry.push(pgeingShow);
    }

    let pgeingShowD: PgeingShow = new PgeingShow();
    pgeingShowD.pageingShow = '>>';
    pgeingShowD.pageingCss = '';
    this.pagingModel.pageShowArry.push(pgeingShowD);
  }

  //タイプ名前の設定
  private setCustomerTypeName() {

    for (let customer of this.customerListWhere) {
      for (let customerType of this.customerTypeList) {
        if (customer.typeId == customerType.id) {
          customer.typeName = customerType.name;
          break;
        }
      }
    }
  }

  //ページ数より、データを表示
  private showData(pageNum: number): void {

    this.customerList.length = 0;

    let iDataCount: number = this.customerListWhere.length;
    let onePageCount: number = this.pagingModel.onePageCount;

    if (onePageCount >= iDataCount) {
      for (let customerM of this.customerListWhere) {
        this.customerList.push(customerM);
      }
      return;
    }

    let indexStart: number = (pageNum-1)*onePageCount;
    let indexEnd: number = pageNum*onePageCount;

    while(indexStart < indexEnd) {
      if (indexStart >= iDataCount) {
        break;
      }
      this.customerList.push(this.customerListWhere[indexStart]);
      indexStart++;
    }
  }

  //空の判定
  private isEmpty(str): boolean {
    return (!str || 0 === str.trim().length);
  }

  //checkboxの判定
  private isCheck(str): boolean {
    return (str || 'false' === str);
  }

  //checkboxの判定
  private getCheckStr(str): string {
    return this.isCheck(str) ? 'true' : '';
  }

}
