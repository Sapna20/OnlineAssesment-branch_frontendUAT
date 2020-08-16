import { Component, OnInit, HostListener, ViewChild} from '@angular/core';
import {  FormGroup } from '@angular/forms';
import {MdbTableDirective} from "angular-bootstrap-md"; 
import { ResultRow } from './models/result-row.model';
import { ResultMailData } from './models/result-mail.model';
import { ResultService } from './services/result.service';
import * as XLSX from 'xlsx'; 
import { Router } from '@angular/router'; 
import { ActivatedRoute } from '@angular/router'; 
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationsService } from '../shared/services/notifications.service';

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.scss']
})

export class TestResultsComponent implements OnInit {

  public form: FormGroup;

  @ViewChild(MdbTableDirective, { static: true }) 

  mdbTable: MdbTableDirective; 
  rowElements: any = []; 
  headElements = ['Id', 'Name', 'Email','Date', 'Score']; 
  searchText: string = '';      
  previous: string;
  lowerScoreLimit = 0;
  resultrowindex = 0;
  id:number;
  candidateId: number;
  resultMailData = new ResultMailData();
  constructor(private resultService: ResultService, private router: Router, private route: ActivatedRoute,private notifyService: NotificationsService) { } 
  @HostListener('input') 
  
  oninput() { 
      this.searchItems();
  } 

  ngOnInit(): void {
    let examId = parseInt(this.route.snapshot.paramMap.get('examId'));
    this.id = examId;
    this.getResultRows();
    this.mdbTable.setDataSource(this.rowElements); 
    this.previous = this.mdbTable.getDataSource(); 
  }

  /*name of the excel-file which will be downloaded. */ 
  fileName = 'exam-result.xlsx';  

  exportexcel(): void {
       /* table id is passed over here */   
       let element = document.getElementById('excel-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       XLSX.writeFile(wb, this.fileName);	
  }

  sendmail(): void {

      let element = <HTMLTableElement>document.getElementById('excel-table');

      this.resultMailData.CandidateEmail = "";
      for (var i = 1, row; row = element.rows[i]; i++) {
        
        if (i == 1) 
        {
          this.resultMailData.CandidateEmail =  row.cells[2].innerHTML;
        }
        else {
          this.resultMailData.CandidateEmail = this.resultMailData.CandidateEmail + "," + row.cells[2].innerHTML;
        }
     }
     
    this.resultMailData.ExamId = this.id.toString()

     this.resultService.sendMailData(this.resultMailData)
      .subscribe(
        (response) => {

         },
         (err: HttpErrorResponse) => {
          this.notifyService.showError("Mail Not Sent!", "Error!");
  
        },
        () => {
          this.notifyService.showSuccess("You can proceed", "Result shared successfully !!");
        }
        
      )



  }

  searchItems() { 
    const prev = this.mdbTable.getDataSource(); 
    if (!this.searchText) {
        this.mdbTable.setDataSource(this.previous); 
        this.rowElements = this.mdbTable.getDataSource(); 
    } 
    if (this.searchText) { 
        this.rowElements = this.mdbTable.searchLocalDataBy(this.searchText);
        this.mdbTable.setDataSource(prev); 
        } 
    } 

    onSelectReport(candidateId): void {

      this.candidateId = candidateId;
      this.router.navigate(['/candidate-report', this.id, this.candidateId]);
  
    }  

    getResultRows(): void {

      this.resultService.getResultRows(this.id)
          .subscribe(
            (resp) => {
              let resSTR = JSON.stringify(resp);
              let resJSON = JSON.parse(resSTR);

              this.resultrowindex = 0;
              for(var element in resJSON.data)
              {
                this.rowElements.push({ Id: resJSON.data[this.resultrowindex].candid, Name: resJSON.data[this.resultrowindex].firstName + " " + resJSON.data[this.resultrowindex].lastName, Email: resJSON.data[this.resultrowindex].email, Date: resJSON.date, Score: resJSON.data[this.resultrowindex].marks });
                this.resultrowindex = this.resultrowindex + 1;
              }
            }, 
            err => {
              console.log(err);
            }
          );
    }

}
