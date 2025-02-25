import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventory } from '../models/inventory.model';
import { Warehouse } from '../models/warehouse.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private jsonApiUrl = 'http://localhost:5050/api/Inventory';
// 'http://localhost:5050/api/Inventory/GetInventoryByProduct/2'
  constructor(private _httpClient: HttpClient) { }

  // getAllProducts(): Observable<Inventory[]> {
  //   return this._httpClient.get<Inventory[]>(this.jsonApiUrl);
  // }

  addInventory(inventory: Inventory): Observable<Inventory> {
    return this._httpClient.post<Inventory>(this.jsonApiUrl, inventory);
  }

  editInventory(id: number, inventory: Inventory): Observable<Inventory> {
    return this._httpClient.put<Inventory>(`${this.jsonApiUrl}/${id}`, inventory);
  }

  getInventory(id: number): Observable<Inventory[]> {
    return this._httpClient.get<Inventory[]>(`${this.jsonApiUrl}/GetInventoryByProduct/${id}`);
  }

  getWarehousList(): Observable<Warehouse[]> {
    return this._httpClient.get<Warehouse[]>(`${this.jsonApiUrl}/GetWareouseList`); 
  }
  getProductList(): Observable<Product[]> {
    return this._httpClient.get<Product[]>(`${this.jsonApiUrl}/GetProductList`); 
  }

  getInventoryList(warehouseId: any=null, productId: any=null): Observable<Inventory[]> {
    if(warehouseId != null && productId == null)
    {
      return this._httpClient.get<Inventory[]>(`${this.jsonApiUrl}/GetInventoriesByWarehouseOrProduct?warehouseId=${warehouseId}`);
    }
    else if(warehouseId == null && productId != null)
    {
      return this._httpClient.get<Inventory[]>(`${this.jsonApiUrl}/GetInventoriesByWarehouseOrProduct?productId=${productId}`);
    }
    else if(warehouseId != null && productId != null)
    {
      return this._httpClient.get<Inventory[]>(`${this.jsonApiUrl}/GetInventoriesByWarehouseOrProduct?warehouseId=${warehouseId}&productId=${productId}`);
    }
    else
    {
      return this._httpClient.get<Inventory[]>(`${this.jsonApiUrl}/GetInventoriesByWarehouseOrProduct`);
    }
  }

}
