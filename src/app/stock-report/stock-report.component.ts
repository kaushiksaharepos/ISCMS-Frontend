import { Component } from '@angular/core';
import { Inventory } from '../models/inventory.model';
import { InventoryService } from '../services/inventory.service';
import { NgModule } from '@angular/core';  
import { BrowserModule } from '@angular/platform-browser';  
import { CommonModule, NgFor } from "@angular/common";
import { Warehouse } from '../models/warehouse.model';
import { Product } from '../models/product.model';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ActivatedRoute, Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-stock-report',
  standalone:false,
  //imports: [],
  templateUrl: './stock-report.component.html',
  styleUrl: './stock-report.component.css'
})
export class StockReportComponent {

  title = 'Stock Report';
  
  warehouse: Warehouse[] = [];
	selectedWarehouseId: any = null ;

  products: Product[] = [];
	selectedProductId: any = null ;

  inventories: Inventory[] = [];

  
  inventoriesExport: any[] = [];

  
  constructor(private _inventoryService: InventoryService, private _router: Router, private route: ActivatedRoute) { }

  ngOnInit():void {

  this._inventoryService.getInventoryList().subscribe((data) => {       
      this.inventories = data;
       console.log(this.inventories);
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

  exportToExcel() {
    
    if(this.inventories!=null)
    {
      this.inventories.forEach(item => {
        this.inventoriesExport.push({
          //item, 
          warehouseLocation:item.warehouseLocation,
          productName:item.productName,
          quantity: item.quantity

        });
      }); 

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.inventoriesExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Stock Report');
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    saveAs(data, 'Stock_Report.xlsx');
    this.inventoriesExport=[];
    }
    
  }

}
