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
import { Transfer } from '../models/transfer.model';
import { TransferService } from '../services/transfer.service';
import { transition } from '@angular/animations';
import { setAlternateWeakRefImpl } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-product-transfer',
  standalone: false,
  templateUrl: './product-transfer.component.html',
  styleUrl: './product-transfer.component.css'
})

export class ProductTransferComponent {

  fromWarehouse: Warehouse[] = [];
  selectedFromWarehouseId: any = null;

  toWarehouse: Warehouse[] = [];
  selectedToWarehouseId: any = null;

  products: Product[] = [];
  inventories: Inventory[] = [];
  inventory: Inventory | undefined;
  addInventory: any;
  // Inventory = {
  //   productId: 0, warehouseId: 0, quantity: 0, createdDate: new Date('YYYY-MM-DD'),
  //   inventoryId: 0,
  //   productName: '',
  //   warehouseLocation: '',
  //   updatedBy: '1',
  //   updatedDate: new Date('YYYY-MM-DD'),
  //   product: undefined,
  //   warehouse: undefined
  // };
  selectedProductId: any = null;
  selectedProductQty: any = 0;
  TransferProductQty: any = 0;
  currentDate = new Date();

  // inventories!: Inventory;
  transfer: Transfer = {
    fromWarehouseId: this.selectedFromWarehouseId,
    toWarehouseId: this.selectedToWarehouseId,
    productId: this.selectedProductId,
    quantity: this.TransferProductQty,
    userId: 1,
    transferId: 0,
    transferDate: new Date('YYYY-MM-DD'),
    createdDate: new Date('YYYY-MM-DD'),
    productName: '',
    fromWarehouseLocation: '',
    toWarehouseLocation: '',
    userMailId: ''
  }
  
  constructor(public _inventoryService: InventoryService, public _transferService: TransferService, 
    public _router: Router, public route: ActivatedRoute) { }

  ngOnInit(): void {

    this._inventoryService.getWarehousList().subscribe((data) => {
      console.log("Warehouse List");
      this.fromWarehouse = data;
      this.toWarehouse = data;
    }, (error) => {
      console.log(error);
    });

    // this._inventoryService.getProductList().subscribe((data) => {
    //   console.log("Product List");
    //   this.products = data;
    // }, (error) => {
    //   console.log(error);
    // });

  }

  OnChangeGetProducts(){
    this.selectedProductId = null;
    this.selectedProductQty = null;
    this._inventoryService.getInventoryList(this.selectedFromWarehouseId, null).subscribe((data) => {       
        this.inventories = data;
        console.log(this.inventories);
    }, (error) => {
      console.log(error);
    }); 
  }

  GetProductQty() {   

    this.inventory = this.inventories.find(
      (inv) => inv.productId === this.selectedProductId
    ); 

    // this._inventoryService.getInventoryList(this.selectedFromWarehouseId, this.selectedProductId).subscribe((data) => {       
    //   // Find the product by its productId
    // this.inventories = data;
    // this.inventory = this.inventories.find(
    //   (inv) => inv.productId === this.selectedProductId
    // );  
    //   // this.inventory = data[0];
    //     console.log(this.inventory);

    // }, (error) => {
    //   console.log(error);
    // }); 
   
    this.selectedProductQty = this.inventory?.quantity;
    console.log(this.selectedProductId);
    console.log(this.selectedProductQty);    
  }

  TransferProduct() {
    console.log("Transfer clicked");

    if(this.selectedFromWarehouseId==undefined || this.selectedFromWarehouseId==null)
    {
      alert("Select from warehouse");
      return;
    }
    else if(this.selectedToWarehouseId==undefined || this.selectedToWarehouseId==null)
    {
      alert("Select to warehouse");
      return;
    }
    else if(this.selectedProductId ==undefined || this.selectedProductId==null)
    {
      alert("Select product");
      return;
    }

    if(this.selectedFromWarehouseId==this.selectedToWarehouseId)
    {
      alert("From warehouse and To warehouse cannot be same");
    }
    else if(this.TransferProductQty>this.selectedProductQty)
    {
      alert("Transfer quantity cannot be greater than warehouse product quantity");
    }
    else
    {
      this.transfer.fromWarehouseId = this.selectedFromWarehouseId;
      this.transfer.toWarehouseId = this.selectedToWarehouseId;
      this.transfer.productId = this.selectedProductId;
      this.transfer.quantity = this.TransferProductQty;
      this.transfer.userId = 1;
    
      this._inventoryService.getInventoryList(this.selectedToWarehouseId, this.selectedProductId).subscribe((data) => {       
          console.log(data);
          if(data== null || data==undefined || data.length==0)
          {
            console.log("data not found");
            this.addInventory = {
              productId : this.selectedProductId,
              warehouseId : this.selectedToWarehouseId,
              quantity : 0,
              createdDate : new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate())
            };
            // this.addInventory.productId = this.selectedProductId;
            // this.addInventory.warehouseId = this.selectedToWarehouseId;
            // this.addInventory.quantity = 0;
            // this.addInventory.createdDate = new Date('2025-02-22');
            this._inventoryService.addInventory(this.addInventory).subscribe((data) => {
              console.log("Inventory new record added.");
              this.transfer.transferDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate());
              this.transfer.createdDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate());
              this._transferService.transferProduct(this.transfer).subscribe((data) => {       
                  console.log(data);  
                  this.selectedFromWarehouseId = null;
                  this.selectedToWarehouseId = null;
                  this.selectedProductId = null;
                  this.selectedProductQty = null;
                  this.TransferProductQty = null;
                  alert("Product transfered successfully");            
                }, (error) => {
                  console.log(error);
                }); 

            }, (error) => {
              console.log(error);
            })
          }
          else
          {
            console.log("data found")
            this.transfer.transferDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate());
              this.transfer.createdDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate());
            this._transferService.transferProduct(this.transfer).subscribe((data) => {       
                console.log(data);  
                this.selectedFromWarehouseId = null;
                this.selectedToWarehouseId = null;
                this.selectedProductId = null;
                this.selectedProductQty = null;
                this.TransferProductQty = null;
                alert("Product transfer successfully");            
              }, (error) => {
                console.log(error);
              });
          }
      }, (error) => {
        console.log(error);
      });

      // this._transferService.transferProduct(this.transfer).subscribe((data) => {       
      //   console.log(data);  
      //   this.selectedFromWarehouseId = null;
      //   this.selectedToWarehouseId = null;
      //   this.selectedProductId = null;
      //   this.selectedProductQty = null;
      //   this.TransferProductQty = null;
      //   alert("Product transfer successfully");            
      // }, (error) => {
      //   console.log(error);
      // }); 

    }
  }

}
