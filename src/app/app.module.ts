import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { routes } from "./app.routes";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { TransferReportComponent } from "./transfer-report/transfer-report.component";
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from "./login/login.component";
import { ProductTransferComponent } from "./product-transfer/product-transfer.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { StockReportComponent } from "./stock-report/stock-report.component";
import { ManagerDashboardComponent } from "./manager-dashboard/manager-dashboard.component";
import { ProductsComponent } from "./products/products.component";
import { EditProductComponent } from "./edit-product/edit-product.component";


@NgModule({
    declarations: [HomeComponent,TransferReportComponent,LoginComponent,
      StockReportComponent,ManagerDashboardComponent,ProductsComponent, EditProductComponent,ProductTransferComponent],
    imports: [
      BrowserModule , 
      RouterModule.forRoot(routes) , 
      HttpClientModule, 
      CommonModule, 
      RouterModule, 
      FormsModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatFormFieldModule,
      MatInputModule,
      AppRoutingModule,
      NgSelectModule
      
    ],
    providers: [
    provideAnimationsAsync()
  ],
    bootstrap: [HomeComponent]
})

export class AppModule { }