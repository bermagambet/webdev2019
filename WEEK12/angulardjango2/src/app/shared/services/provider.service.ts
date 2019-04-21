import { Injectable, EventEmitter } from '@angular/core';
import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';
import { IList, ITask, IListInfo } from '../models/models';

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

   getTasks(list: IList): Promise<ITask[]>{
     return this.get('http://localhost:8000/tasklist/' + list.id + '/tasks', {});
   }

   getList(list: IList): Promise<IList>{
    return this.get('http://localhost:8000/tasklist/' + list.id + '/info', {})
   }

   createList(name:any): Promise<IList>{
    return this.post('http://localhost:8000/tasklist', {
      name: name
    });
   }

   updateList(list: IList): Promise<IList>{
     return this.put('http://localhost:8000/tasklist/' + list.id + '/info'  , {
       name: list.name
     })
   }

   deleteList(id: number): Promise<any>{
     return this.delet('http://localhost:8000/tasklist/' + id + '/info', {});
   }

}
