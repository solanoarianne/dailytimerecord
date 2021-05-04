import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  constructor(private http: HttpClient) {}

  apiURL = "http://localhost/cocolime/inventorySys/restAPI/";

  sendApiRequest(method, data) {
    return <any>(
      this.http.post(this.apiURL + method, btoa(JSON.stringify(data)))
    );
  }
}
