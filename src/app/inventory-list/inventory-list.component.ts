import { Component } from '@angular/core';
import { Inventory } from '../models/inventory.model';
import { InventoryService } from '../services/inventory.service';
import { NgModule } from '@angular/core';  
import { BrowserModule } from '@angular/platform-browser';  
import { CommonModule } from "@angular/common";
import { Warehouse } from '../models/warehouse.model';
import { Product } from '../models/product.model';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inventory-list',
  standalone: false,
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.css'
})
export class InventoryListComponent {
  title = 'Inventory List';
  
  warehouse: Warehouse[] = [];
	selectedWarehouseId: any = null ;

  products: Product[] = [];
	selectedProductId: any = null ;

  inventories: Inventory[] = [];

  
  constructor(private _inventoryService: InventoryService, private _router: Router, private route: ActivatedRoute) { }

  ngOnInit():void {

    // this._inventoryService.getAllProducts().subscribe((data) => {       
    //    this.inventories = data;
    //    console.log(this.inventories);
    // }, (error) => {
    //   console.log(error);
    // });

  this._inventoryService.getInventoryList().subscribe((data) => {       
      this.inventories = data;
      // console.log(this.inventories);
   }, (error) => {
     console.log(error);
   });
    

    this._inventoryService.getWarehousList().subscribe((data) => {       
        console.log("Warehouse List");
        // console.log(data);
        this.warehouse = data;
        // console.log(this.warehouse);
    }, (error) => {
      console.log(error);
    });

    this._inventoryService.getProductList().subscribe((data) => {       
        console.log("Product List");
        // console.log(data);
        this.products = data;
        // console.log(this.products);
    }, (error) => {
      console.log(error);
    });

  }

  onSearch() {
    console.log("Search clicked");   
    this._inventoryService.getInventoryList(this.selectedWarehouseId, this.selectedProductId).subscribe((data) => {       
        this.inventories = data;
        console.log(this.inventories);
    }, (error) => {
      console.log(error);
    }); 
  }

  ResetDropdownLists()
  {
    this.selectedWarehouseId = null;
    this.selectedProductId = null
  }

}
