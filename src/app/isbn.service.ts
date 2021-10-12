import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

export class IsbnResp {
    book : Book
}
export class Book {
  title: string;
  title_long : string;
  isbn : string;
  isbn13 : string;
  dewey_decimal : string;
  binding : string;
  publisher : string;
  language : string;
  date_published : string;
  edition : string;
  pages : number;
  dimensions : string;
  overview : string;
  image : string;
  msrp : number;
  excerpt : string;
  synopsys : string;
  authors : string [];
  subjects : string [];
  reviews : string [];
}

@Injectable({
  providedIn: 'root'
})
export class IsbnService {
  endPoint: string = 'https://api2.isbndb.com/book/';
  key: string = '46805_9de85d4b2635d4d81c5c3ecb7d153915'
  
  constructor(private httpClient:HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.key
    })
  }

  getBook(id): Observable<IsbnResp> {
    return this.httpClient.get<IsbnResp>(this.endPoint + id, this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  
  }
  
  httpError(error) {
    let msg = '';
    console.log(error);
    if(error.error instanceof ErrorEvent) {
      // client side error
      msg = error.error.message;
    } else {
      // server side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }

}
