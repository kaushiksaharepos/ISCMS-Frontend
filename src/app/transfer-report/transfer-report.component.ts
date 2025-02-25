import { Component } from '@angular/core';
import { TransferService } from '../services/transfer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Transfer } from '../models/transfer.model';
import { formatDate } from '@angular/common';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-transfer-report',
  standalone: false,
  //imports: [],
  templateUrl: './transfer-report.component.html',
  styleUrl: './transfer-report.component.css'
})
export class TransferReportComponent {
  title = 'Transfer Report';

  selectedFromDate?: Date  ;
  selectedToDate?: Date  ;
   formattedFromDate = '';
   formattedToDate = '';

  transferList: Transfer[] = [];

  transferListExport: any[]= [];

  constructor(private _transferService: TransferService, private _router: Router, private route: ActivatedRoute){}

  ngOnInit():void{

    this._transferService.getTransferList().subscribe((data) => {       
      this.transferList = data;
      // console.log(this.inventories);
   }, (error) => {
     console.log(error);
   });

  }

  onSearch() {
    console.log("Search clicked");  
    if (this.selectedFromDate) {
      this.formattedFromDate = this.selectedFromDate.toDateString();
      this.formattedFromDate= formatDate(this.selectedFromDate, 'yyyy-MM-dd', 'en-US');
    } 
    if (this.selectedToDate) {
      this.formattedToDate = this.selectedToDate.toDateString();
      this.formattedToDate=formatDate(this.selectedToDate, 'yyyy-MM-dd', 'en-US');
    }
    this._transferService.getTransferList(this.formattedFromDate, this.formattedToDate).subscribe((data) => {       
        this.transferList = data;
        console.log(this.transferList);
    }, (error) => {
      console.log(error);
    }); 
  }

  ResetAllField()
  {
    this.formattedFromDate = '';
    this.formattedToDate = '';
  }

  exportToExcel() {

    if(this.transferList!=null)
      {
        this.transferList.forEach(item => {
          this.transferListExport.push({
            //item, 
            productName:item.productName,
            From_warehouseLocation:item.fromWarehouseLocation,
            To_warehouseLocation:item.toWarehouseLocation,
            quantity: item.quantity,
            Transfer_Date: item.transferDate
  
          });
        });
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.transferListExport);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Stock Report');
      const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  
      saveAs(data, 'Transfer_Report.xlsx');
      this.transferListExport = [];
      }

      
    }


}
