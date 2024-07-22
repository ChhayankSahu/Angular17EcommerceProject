import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
httpOptions={
headers:new HttpHeaders({
  "Content-Type":"application/json"
  ,"access-control-allow-origin":"*"
})
}
  constructor(private http:HttpClient) { }

private formatErrors(error:any){
  return throwError(error.error);
}
get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
  return this.http.get(path, { params }).pipe(catchError(this.formatErrors));
}

put(path:string,body:Object={} ) :Observable<any>{
return this.http.put(path,JSON.stringify(body),this.httpOptions ).pipe(catchError(this.formatErrors));
}

post(url:string,body:Object={}):Observable<any>{
  return this.http.post(url,JSON.stringify(body),this.httpOptions ).pipe(catchError(this.formatErrors));
}



delete(url:string):Observable<any>{
  return this.http.delete(url,this.httpOptions ).pipe(catchError(this.formatErrors));
}

}