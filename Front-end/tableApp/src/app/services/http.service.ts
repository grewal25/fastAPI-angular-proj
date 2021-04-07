import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  private requestToServer(
    requestType: string,
    requestUrl: string,
    postJson: any
  ): Observable<any> | undefined {
    const combineUrl = this.baseUrl + requestUrl;
    if (requestType) {
      switch (requestType.toLowerCase()) {
        case 'post':
          return this.http.post(combineUrl, postJson);
        case 'get':
          return this.http.get(combineUrl, postJson);
        default:
          return;
      }
    } else {
      console.log('Please enter valid requestType');
      return;
    }
  }

  public getClubList() {
    const requestUrl = '/info';
    return this.requestToServer('get', requestUrl, '');
  }

  public postClubList( postJson: any) {
      const requestUrl = '/cities'
    return this.requestToServer('post', requestUrl, postJson);
  }
}
