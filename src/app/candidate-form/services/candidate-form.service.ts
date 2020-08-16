import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Candidate } from '../model/candidate';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/throw';
import {AppConstants} from '../../shared/constants/AppConstants';

@Injectable({providedIn:'root'})
export class CandidateFormService {
 
  baseURL: string = AppConstants.apiURL; 
  
  
  constructor(private http: HttpClient) {

  }
 

  addCandidate(candidate:Candidate) {
    const headers = { 'content-type': 'application/json',  'No-Auth': 'True'}  
    const body = JSON.stringify(candidate);
    return this.http.post(this.baseURL + '/candidate', body,{'headers':headers})
    
  }
}