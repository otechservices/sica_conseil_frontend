import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../utils/config-service';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  constructor(private http: HttpClient) { }

    getUrls(resource:any){
      return this.http.post<any>(`${ConfigService.toApiUrl("files-urls")}`,resource,
       ConfigService.addAction('RECUPERER'));
    }
}
