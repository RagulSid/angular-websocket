import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MsgServiceService {

  constructor(private http: HttpClient){

  }

  create(data: any){
    // return this.http.post("http://localhost:8082/api/message", data);
  }
  
}
