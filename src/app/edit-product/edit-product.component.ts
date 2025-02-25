import { Component } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Inventory } from '../models/inventory.model';
import { InventoryService } from '../services/inventory.service';
import { Warehouse } from '../models/warehouse.model';

@Component({
  selector: 'app-edit-product',
  standalone: false,
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})

export class EditProductComponent {

  title = 'Add Product Stock';
  products: Product[] = [];
  // product: Product | undefined;
  product: Product = { productId: 0, name: "", price: 0 };
  inventories: Inventory[] = [];
  // inventory: Inventory | undefined;
  productId: number = 0;
  warehouse: Warehouse[] = [];
  selectedWarehouseId: any = null ;
  editMode: boolean = false;
  currentDate = new Date();

  inventory: Inventory = {
    productId: 0, warehouseId: 0, quantity: 0, createdDate: new Date('DD-MM-YYYY'),
    inventoryId: 0,
    productName: '',
    warehouseLocation: '',
    updatedBy: '1',
    updatedDate: new Date('DD-MM-YYYY'),
    product: undefined,
    warehouse: undefined
  };
  
    constructor(private _productService: ProductService, private _inventoryService: InventoryService
      , private _router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {

      this.productId = +this.route.snapshot.paramMap.get('productId')!;
      this.selectedWarehouseId = +this.route.snapshot.paramMap.get('warehouseId')!;

      // Dropdown loading
      this._inventoryService.getWarehousList().subscribe((data) => {
        this.warehouse = data;
      }, (error) => {
        console.log(error);
      });
      this._productService.getProducts().subscribe(data => {
        this.products = data;
        this.GetProductPrice();
      }, (error) => {
        console.log(error);
      });

      if (this.productId && this.selectedWarehouseId) {
        this.title = 'Edit Stock';     
        this.editMode = true;
      }
      else{
        this.title = 'Add Stock';
        this.editMode = false;
      }
      // this.GetProductQty();
    }
    
    GetProductPrice() {  
      var objProduct = this.products.find(
        (inv) => inv.productId === this.productId
      );        
      if(objProduct!=null)
      {
        this.product.price = objProduct.price;
      }
      else{
        this.product.price = 0;
      }
      this.GetProductQty();
    }

    GetProductQty(){
      this._inventoryService.getInventoryList(this.selectedWarehouseId, this.productId).subscribe((data) => {       
        if(data!= null && data!=undefined && data.length!=0)
        {  
          this.inventories = data;
          this.inventory = data[0]
          // this.inventory = this.inventories.find(
          //   (inv) => inv.productId === this.productId
          // ); 
        }
        else{
          this.inventory.quantity=0;
        }
      }, (error) => {
        console.log(error);
      }); 
    }

    EditInventory(){
      this._inventoryService.editInventory(this.inventory.inventoryId, this.inventory).subscribe((data) => {
        console.log("Stock updated successfully.");
        alert("Stock Updated successfully");   
        this.Reset();         
      }, (error) => {
        console.log(error);
      })
    }

    onSave() {
      console.log(this.product);
      if(this.editMode)
      {
        this.EditInventory();
        // this._inventoryService.editInventory(this.inventory.inventoryId, this.inventory).subscribe((data) => {
        //   console.log("Stock updated successfully.");
        //   alert("Stock Updated successfully");            
        // }, (error) => {
        //   console.log(error);
        // })
      }
      else
      {
        this._inventoryService.getInventoryList(this.selectedWarehouseId, this.productId).subscribe((data) => {       
          if(data!= null && data!=undefined && data.length!=0)
          {  
            // alert("Product in warehouse already exists");
            const confirmed = window.confirm('Product in warehouse already exists, would you like to update quantity?');
            if (confirmed) {
              // Proceed with adding item
              console.log('Stock updated');
              this.EditInventory();
            } else {
              console.log('No Action taken');
            }
          }
          else
          {
            this.inventory.productId = this.productId;
            this.inventory.warehouseId = this.selectedWarehouseId;
            this.inventory.createdDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate());
            this.inventory.updatedDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate());
            // this.inventory  = {
            //   productId : this.selectedProductId,
            //   warehouseId : this.selectedToWarehouseId,
            //   quantity : 0,
            //   createdDate : new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate())
            // };
            this._inventoryService.addInventory(this.inventory).subscribe((data) => {
              console.log(data);
              console.log("Stock new added.");
              alert("Stock Added successfully");  
              //this.router.navigate(['/home']);         
            }, (error) => {
              console.log(error);
            });
          }
        }, (error) => {
          console.log(error);
        }); 

        
      }
           
    
    
    
    }

    Reset(){
      this.selectedWarehouseId=null;
      this.productId=0;
      this.GetProductPrice();
      


    }

}
