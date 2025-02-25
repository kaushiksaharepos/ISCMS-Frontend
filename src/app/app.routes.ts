import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductTransferComponent } from './product-transfer/product-transfer.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { StockReportComponent } from './stock-report/stock-report.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TransferReportComponent } from './transfer-report/transfer-report.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AuthGuard } from './auth.guard';
import { EditProductComponent } from './edit-product/edit-product.component';

export const routes: Routes = [
     { path: 'home', component: HomeComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'edit-product/:productId/:warehouseId', component: EditProductComponent },
    { path: 'add-product', component: EditProductComponent },
    { path: 'products-Transfer', component: ProductTransferComponent },
    { path: 'inventory-list', component: InventoryListComponent },
    { path: 'transfer-report', component: TransferReportComponent },
    {
        path: "inventory-list",
        loadChildren: () =>
          import(
            "./modules/manager.module"
          ).then((m) => m.ManagerModule)
    },


    { path: 'stock', component: StockReportComponent },
    
    { path: 'MANAGER', component: ProductTransferComponent, canActivate: [AuthGuard], data: { role: 'MANAGER' } },
    { path: 'OPERATOR', component: ProductsComponent, canActivate: [AuthGuard], data: { role: 'OPERATOR' } },
    { path: 'unauthorized', component: UnauthorizedComponent },
    { path: '**', component: PageNotFoundComponent },
    


];
