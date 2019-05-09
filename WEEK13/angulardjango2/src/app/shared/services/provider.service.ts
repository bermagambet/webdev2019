import { Injectable, EventEmitter } from '@angular/core';
import { MainService } from './main.service';
import { HttpClient } from '@angular/common/http';
import { IList, ITask, IListInfo, IAuth } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService{


  public sendMessage = new EventEmitter<string>();

  constructor(http: HttpClient) {
    super(http);

   }

   getLists(orderchter: string): Promise<IList[]>{
     return this.get('http://localhost:8000/tasklist/' + orderchter, {});
   }

   getTasks(list: IList, orderchter: string): Promise<ITask[]>{
     return this.get('http://localhost:8000/tasklist/' + list.id + '/tasks/' + orderchter, {});
   }

   getList(list: IList): Promise<IList>{
    return this.get('http://localhost:8000/tasklist/' + list.id + '/info/', {})
   }

   createList(name:any, tasks: ITask[]): Promise<IList>{
    return this.post('http://localhost:8000/tasklist/', {
      name: name,
      tasks: tasks
    });
   }
   
   createTask(name: any, due_on: any, status: any, tasklist_id: number): Promise<ITask>{
    return this.post('http://localhost:8000/tasklist/' + tasklist_id + '/tasks/', {
      name: name,
      due_on: due_on,
      status: status,
      task_list: tasklist_id
    });
   }

   updateTask(task: ITask): Promise<ITask>{
    return this.put('http://localhost:8000/tasklist/' + task.task_list + '/tasks/' + task.id + '/info', {
      name: task.name,
      due_on: task.due_on,
      status: task.status,
      task_list: task.task_list
    });
   }

   updateList(list: IList): Promise<IList>{
     return this.put('http://localhost:8000/tasklist/' + list.id + '/info/', {
       name: list.name,
       tasks: list.tasks
     })
   }

   deleteList(xd: number): Promise<any>{
     return this.delet('http://localhost:8000/tasklist/' + xd + '/info/', {});
   }

   auth(login: any, password: string): Promise<IAuth> {
     return this.post('http://localhost:8000/login/', {
       username: login,
       password: password
     });
   }

   logout(): Promise<any> {
    return this.post('http://localhost:8000/api/logout/', {});
  }

}
