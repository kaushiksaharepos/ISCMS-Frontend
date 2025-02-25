import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transfer } from '../models/transfer.model';
 
@Injectable({
  providedIn: 'root'
})
export class TransferService {
 
  private jsonApiUrl = 'http://localhost:5050/api/Transfer';
  constructor(private _httpClient: HttpClient) { }
 
  getTransferList(fromDate: any=null, toDate: any=null): Observable<Transfer[]> {
      if(fromDate != null && toDate == null)
      {
        return this._httpClient.get<Transfer[]>(`${this.jsonApiUrl}/GetTransferDetails?fromDate=${fromDate}`);
      }
      else if(fromDate == null && toDate != null)
      {
        return this._httpClient.get<Transfer[]>(`${this.jsonApiUrl}/GetTransferDetails?toDate=${toDate}`);
      }
      else if(fromDate != null && toDate != null)
      {
        return this._httpClient.get<Transfer[]>(`${this.jsonApiUrl}/GetTransferDetails?fromDate=${fromDate}&toDate=${toDate}`);
      }
      else
      {
        return this._httpClient.get<Transfer[]>(`${this.jsonApiUrl}/GetTransferDetails`);
      }
    }



    transferProduct( transfer: Transfer): Observable<Transfer> {
      return this._httpClient.put<Transfer>(`${this.jsonApiUrl}`, transfer);
    }
 
}