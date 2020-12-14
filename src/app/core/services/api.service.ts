import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = environment.url;
  constructor(private http: HttpClient) { }

  apiRequest(action: string, sendData: any = {}, verb: string = 'post'): Promise<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return new Promise<any>(resolve => {
      let req: any;
      switch (verb) {
        case 'post':
          console.log(sendData)
          req = this.http.post(this.url + action, sendData);
          break;
        case 'get':
          req = this.http.get(this.url + action);
          break;
        case 'put':
          req = this.http.put(this.url + action, sendData);
          break;
        case 'delete':
          req = this.http.delete(this.url + action + '/' + sendData);
          break;
      }
      req.subscribe(
        (response: any) => resolve(response),
        (error: any) => resolve(error)
      );
    });
  }
}
