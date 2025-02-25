import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { Inventory } from '../models/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private jsonApiUrl = 'http://localhost:5050/api/Product';

  constructor(private _httpClient: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this._httpClient.get<Product[]>(this.jsonApiUrl);
  }

  getProductByWarehouseId(warehouseId: any=null): Observable<Inventory[]> {
    if(warehouseId != null)
    {
      return this._httpClient.get<Inventory[]>(`${this.jsonApiUrl}/GetProductsByWarehouseID?warehouseId=${warehouseId}`);
    }
    else
    {
      return this._httpClient.get<Inventory[]>(`${this.jsonApiUrl}/GetProductsByWarehouseID`);
    }    
  }

  getProduct(id: number): Observable<Product> {
    return this._httpClient.get<Product>(`${this.jsonApiUrl}/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this._httpClient.post<Product>(this.jsonApiUrl, product);
  }

  editProduct(id: number, product: Product): Observable<Product> {
    return this._httpClient.put<Product>(`${this.jsonApiUrl}/${id}`, product);
  }

}
