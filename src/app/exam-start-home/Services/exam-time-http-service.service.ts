import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/shared/constants/AppConstants';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ExamTimeStatus } from '../Models/exam-time-model.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExamTimeStatusService{
    private baseUrl = AppConstants.apiURL;
    constructor(private http: HttpClient) { }
    public getExamTimeStatus(id:string): Observable<ExamTimeStatus>{
        let httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json', 'No-Auth': 'True'
          });
        let options = { headers: httpHeaders };
        let endPoints = "/GetExamTime/"+ id;
        return this.http.get<ExamTimeStatus>(this.baseUrl + endPoints,options);
    }
}

