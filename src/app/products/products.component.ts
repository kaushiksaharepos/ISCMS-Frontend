import { Component } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { NgModule } from '@angular/core';  
import { BrowserModule } from '@angular/platform-browser';  
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { Inventory } from '../models/inventory.model';
import { Warehouse } from '../models/warehouse.model';
import { InventoryService } from '../services/inventory.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  warehouse: Warehouse[] = [];  
  selectedWarehouseId: any = null ;

  products: Product[] = [];
  // selectedProductId: any = null ;

  inventories: Inventory[] = [];
  productNameAsc: any = null;
    
  constructor(private _productService: ProductService, private _inventoryService: InventoryService) { }

  ngOnInit():void {
   
    this._inventoryService.getWarehousList().subscribe((data) => {       
        console.log("Warehouse List");
        // console.log(data);
        this.warehouse = data;
        // console.log(this.warehouse);
    }, (error) => {
      console.log(error);
    });

  }

  onSearch() {
    console.log("Product Search clicked");   
    this.productNameAsc = null; 
    this._productService.getProductByWarehouseId(this.selectedWarehouseId).subscribe(data => {
      this.inventories = data;
      console.log('Product found');
      console.log(this.inventories);
    });
  }

  ResetDropdownLists()
  {
    this.selectedWarehouseId = null;   
    this.productNameAsc = null; 
  }

  sortByNameAsc() {
    if(this.productNameAsc==0)
    {
      // this.inventories.sort((a, b) => a.product?.name.localeCompare(b.product?.name));
      this.inventories.sort((a, b) => {
        const nameA = a.product?.name || '';
        const nameB = b.product?.name || '';
        
        return nameB.localeCompare(nameA, undefined, { sensitivity: 'base' });
      });
      this.productNameAsc =1;
    }
    else
    {
      // this.inventories.sort((a, b) => b.product?.name.localeCompare(a.product?.name));
      this.inventories.sort((a, b) => {
        const nameA = a.product?.name || '';
        const nameB = b.product?.name || '';
        
        return nameA.localeCompare(nameB, undefined, { sensitivity: 'base' });
      });
      this.productNameAsc =0;
    }
  }

  getSortIcon(column: string): string {
    if (this.productNameAsc != null ) {
      return this.productNameAsc == 0  ? 'bi bi-arrow-up' : 'bi bi-arrow-down';
    }
    return '';  // Default icon when not sorted
  }

}
