import { Component, OnInit} from '@angular/core'; 
import { PerformanceData } from './models/result-report.model';
import { ResultReportService } from './services/result-report.service';
import { Router } from '@angular/router'; 
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-candidate-exam-report',
  templateUrl: './candidate-exam-report.component.html',
  styleUrls: ['./candidate-exam-report.component.scss']
})

export class CandidateExamReportComponent implements OnInit {

  isShowData:boolean = false;
  public showHideButtonName:any = 'Show Registration Details';
  cid : any;
  examId: any;
  performanceData: PerformanceData;

  public chartType: string = 'pie';
  public chartDatasets: Array<any> = [];
  public chartLabels: Array<any> = ['Wrong', 'Right', 'Not Attempted'];
  public chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870'],
      borderWidth: 2,
    }
  ];
  public chartOptions: any = {
    responsive: true
  };

  constructor(private resultReportService: ResultReportService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    let examId = parseInt(this.route.snapshot.paramMap.get('examId'));
    let candidateId  = parseInt(this.route.snapshot.paramMap.get('candidateId'));
    this.examId = examId;
    this.cid = candidateId;
    this.getPerformanceData();
  }

  toggle() {
    this.isShowData = !this.isShowData;

    if(this.isShowData)  
      this.showHideButtonName = "Hide Registration Details";
    else
      this.showHideButtonName = "Show Registration Details";
  }

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  getPerformanceData(): void {

    this.resultReportService.getPerformanceData(this.examId, this.cid)
        .subscribe(
          (resp) => {
            this.performanceData = resp;
            this.chartDatasets =    [    { data: [this.performanceData.totalIncorrect, this.performanceData.totalCorrect, this.performanceData.totalQuestions - this.performanceData.totalCorrect - this.performanceData.totalIncorrect], label: 'My First dataset' }]
          }, 
          err => {
            console.log(err);        
          }
        );
  }

}
