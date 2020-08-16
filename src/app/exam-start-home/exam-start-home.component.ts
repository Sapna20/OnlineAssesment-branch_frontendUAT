import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { ExamTimeStatusService } from './Services/exam-time-http-service.service';
import { ExamTimeStatus } from './Models/exam-time-model.model';

@Component({
  selector: 'app-exam-start-home',
  templateUrl: './exam-start-home.component.html',
  styleUrls: ['./exam-start-home.component.scss']
})
export class ExamStartHomeComponent implements OnInit {

  nowdt;  
  examDateTime;
  examId;
  examEndDateTime;
  beforeExamStartTime: boolean = false;
  afterExamEndTime: boolean = false;
  examTimeStatus:ExamTimeStatus = new ExamTimeStatus();
  constructor( private router: Router, private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.examTimeStatus = this.route.snapshot.data.httpData;
    this.examId  = this.examTimeStatus.examId;

    this.examDateTime = new Date(this.examTimeStatus.examStart);

    this.examEndDateTime = new Date(this.examTimeStatus.examEnd);
    
    this.nowdt = new Date() ;
    console.log(this.nowdt);
    this.getMessage();

  }

  getnowDatetime(){
    return this.nowdt;
  };

  getExamDatetime(){
    return this.examDateTime;
  };

  getExamEndDatetime(){
    return this.examEndDateTime;
  };


  getMessage(){
    if( this.nowdt > this.examEndDateTime )
    {
      this.afterExamEndTime = true;
    }
    if(this.nowdt < this.examDateTime  )
    {
      this.beforeExamStartTime = true;
    }
  }

  proceed(){

    if(this.nowdt > this.examDateTime && this.nowdt < this.examEndDateTime )
    {
      return true;
    }

    return false;
  }

  onSubmit(){
    if(this.nowdt > this.examDateTime && this.nowdt < this.examEndDateTime )
    {
      this.router.navigate(['./reg-candidate', this.examId]);
    }      
  }



}
