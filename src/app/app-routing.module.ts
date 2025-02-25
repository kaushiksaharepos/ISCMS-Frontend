import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
//import { routes } from './app.routes';
import { LoginComponent } from './login/login.component';
//import { AuthGuard } from './auth.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { ProductsComponent } from './products/products.component';
import { ProductTransferComponent } from './product-transfer/product-transfer.component';
import { HomeComponent } from './home/home.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { StockReportComponent } from './stock-report/stock-report.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth.guard';
import { TransferReportComponent } from './transfer-report/transfer-report.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { EditProductComponent } from './edit-product/edit-product.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
  // { path: 'user', component: UserComponent, canActivate: [AuthGuard], data: { role: 'user' } },
  { path: 'MANAGER', component: ProductTransferComponent, canActivate: [AuthGuard], data: { role: 'MANAGER' } },
  { path: 'OPERATOR', component: ProductsComponent, canActivate: [AuthGuard], data: { role: 'OPERATOR' } },
  

 // { path: '/login', component: LoginComponent },
      // { path: 'home', component: HomeComponent },
      { path: 'managerDashboard', component: ManagerDashboardComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'edit-product/:productId/:warehouseId', component: EditProductComponent },
          { path: 'add-product', component: EditProductComponent },
      { path: 'products-Transfer', component: ProductTransferComponent },
      { path: 'inventory', component: InventoryListComponent },
      { path: 'stock', component: StockReportComponent },
      { path: 'transfer-report', component: TransferReportComponent },
      { path: 'unauthorized', component: UnauthorizedComponent },
      { path: '**', component: PageNotFoundComponent }


  //{ path: '**', redirectTo: 'login' } // Redirect unknown routes to login
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
