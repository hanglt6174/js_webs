import 'hammerjs';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { CustomerService } from "./customer/services/customer.service";
import { CustomerTypeService } from "./customer/services/customer-type.service";
import { CustomerSearchComponent } from './customer/components/customer-search/customer-search.component';
import { RegisterFormComponent } from "./customer/components/register-form/register-form.component";
import { DetailComponent } from './customer/components/detail/detail.component';
import { ControlMessagesComponent } from "./customer/components/tools/control-messages/control-messages.component";
import { ModifyComponent } from './customer/components/modify/modify.component';
import { SuccessComponent } from './customer/components/tools/success/success.component';
import { DialogComponent } from "./customer/components/tools/dialog/dialog.component";

export const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: CustomerSearchComponent },
  { path: 'search/:pFrom', component: CustomerSearchComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'modify/:id', component: ModifyComponent },
  { path: 'detail/:id', component: DetailComponent}
];
export const appRoutingProviders: any[] = [

];
export const routing = RouterModule.forRoot(routes);

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponent,
    ControlMessagesComponent,
    CustomerSearchComponent,
    DetailComponent,
    ModifyComponent,
    SuccessComponent,
    DialogComponent
  ],
  entryComponents: [DialogComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    routing
  ],
  providers: [appRoutingProviders,CustomerService, CustomerTypeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
