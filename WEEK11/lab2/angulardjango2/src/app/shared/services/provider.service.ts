import { Injectable, EventEmitter } from '@angular/core';
import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';
import { IList } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService{


  public sendMessage = new EventEmitter<string>();

  constructor(http: HttpClient) {
    super(http);

   }

   getLists(): Promise<IList[]>{
     return this.get('http://localhost:8000/tasklist', {});
   }

}
