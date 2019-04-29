import { Component, OnInit, Output, Input} from '@angular/core';
import { ProviderService } from '../shared/services/provider.service';
import { IList, ITask, IListInfo } from '../shared/models/models';
import { isListLikeIterable } from '@angular/core/src/change_detection/change_detection_util';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  public output = '';
  public stringArray: string[] = [];

  public lists: IList[] = [];
  public loading = false;

  public tasks: ITask[] = [];

  public list1 = '';

  public name: any = '';

  public logged = false;

  public login: any = '';

  public password: any = '';

    constructor(private provider: ProviderService) { }

  ngOnInit() {
    if(this.logged){

    this.provider.getLists().then(res => {
      this.lists = res;
    this.loading = true;
    });
  }
  }

  getTasks(list: IList){
    this.provider.getTasks(list).then(res => {
      this.tasks = res;
    });
  }

  getList(list: IList){
    this.provider.getList(list).then(res => {
      this.list1 = "This list has an id of " +  res.id + " and the name " +  res.name;
    });
  }

  sendMessageViaService(){    
    this.provider.sendMessage.emit('smth');
  }

  updateTaskList(c: IList){
    this.provider.updateList(c).then(res=>{
      console.log(c.name + ' updated');
    });
  }

  deleteList(c: IList ){
    this.provider.deleteList(c.id).then(res=>{
      console.log(c.name + ' deleted');
      this.provider.getLists().then(r=>{
        this.lists = r;
      });
    });
  }

  createList(){
    if(this.name != '') {
      this.provider.createList(this.name).then(res=>{
        this.name = '';
        this.lists.push(res);
      });
    }
  }

  auth(){
    if (this.login != '' && this.password != '') {
      this.provider.auth(this.login, this.password).then(res=>{
        localStorage.setItem('token', res.token);
        this.logged = true;
        this.getLists();
      });
    }
  }
  getLists() {
    this.provider.getLists().then(res => {
      this.lists = res;
      this.loading = true;
    });
  }


}
