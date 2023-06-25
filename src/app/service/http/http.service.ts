import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private REST_API = environment.API;

  constructor(private httpClient: HttpClient) {
  }

  public getDatabaseParams(resource: string, locate: string = "", paramConfig: any): Observable<any> {
    const params = paramConfig;
    let url = this.REST_API + resource + "/" + locate;
    return this.httpClient.get<any>(url, {params});
  }

  public getDatabase(resource: string, locate: string = ""): Observable<any> {
    let url = this.REST_API + resource + "/" + locate;
    return this.httpClient.get<any>(url);
  }

  public postDatabase(resource: string, payload: any): Observable<any> {
    let url = this.REST_API + resource;
    return this.httpClient.post<any>(url, payload);
  }

  public putDatabase(resource: string, locate: string, payload: any): Observable<any> {
    let url = this.REST_API + resource + "/" + locate;
    return this.httpClient.put<any>(url, payload);
  }

  public patchDatabase(resource: string, locate: string, payload: any): Observable<any> {
    let url = this.REST_API + resource + "/" + locate;
    return this.httpClient.patch<any>(url, payload);
  }

  public deleteDatabase(resource: string, locate: string): Observable<any> {
    let url = this.REST_API + resource + "/" + locate;
    return this.httpClient.delete<any>(url);
  }
}
