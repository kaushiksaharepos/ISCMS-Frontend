import { BrowserModule } from '@angular/platform-browser';  
import { NgModule } from '@angular/core';  
import { InventoryService } from '../services/inventory.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { routes } from '../app.routes';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';
import { ProductTransferComponent } from '../product-transfer/product-transfer.component';


@NgModule({  
    declarations: [  ],  
    imports: [ BrowserModule, RouterModule.forRoot(routes), HttpClientModule, 
        CommonModule, RouterModule, FormsModule, NgSelectModule
    ],  
    providers: [InventoryService]
})  
export class OperatorModule { }  