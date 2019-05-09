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


  public orderclicked= false;
  public taskorderclicked= false;

  public creatable = false;
  public tasklist_id: number;
  public output = '';
  public stringArray: string[] = [];

  public lists: IList[] = [];
  public loading = false;

  public list: IList;
  public orderchterlists: any = '';
  public orderchterlistf: any = '';
  public orderchterlisto: any = '';

  public orderchtertasks: any = '';
  public orderchtertaskf: any = '';
  public orderchtertasko: any = '';


  public tasks: ITask[] = [];
  public tasksforecreation: ITask[] = [];
  public list1 = '';

  public name: any = '';
  public search = false;
  public filter = false;
  public order = false;

  public tasksearch = false;
  public taskfilter = false;
  public taskorder = false;

  public name1: any = '';
  public due_on: any ='';
  public status: any ='';


  public logged = false;

  public login: any = '';

  public password: any = '';

    constructor(private provider: ProviderService) { }

  ngOnInit() {
    if(this.logged){

    this.provider.getLists('').then(res => {
      this.lists = res;
      this.loading = true;
    });
  }
  }

  getTasks(list: IList){
    if(this.tasksearch){
      this.provider.getTasks(list, '?search=' + this.orderchtertasks).then(res => {
        this.tasks = res;
        this.orderchtertasks = '';
        this.tasklist_id = list.id;
        this.list = list;
        this.creatable = true;
      });
    }
    else
    if(this.taskfilter){
      this.provider.getTasks(list, '?name=' + this.orderchtertaskf).then(res => {
        this.tasks = res;
        this.orderchtertaskf = '';
        this.tasklist_id = list.id;
        this.list = list;
        this.creatable = true;
      });
    }
    else
    if(this.taskorder){
      if(!this.taskorderclicked){
        this.provider.getTasks(list, '?ordering=name').then(res => {
          this.tasks = res;
          this.orderchtertasko = '';
          this.tasklist_id = list.id;
          this.list = list;
          this.creatable = true;
          this.taskorderclicked = true;
        });
    }
    if(this.taskorderclicked){
      this.provider.getTasks(list, '?ordering=-name').then(res => {
        this.tasks = res;
        this.orderchtertasko = '';
        this.tasklist_id = list.id;
        this.list = list;
        this.creatable = true;
        this.taskorderclicked = false;
      });
    }
  }
    else {
    this.provider.getTasks(list, '').then(res => {
      this.tasks = res;
      this.tasklist_id = list.id;
      this.list = list;
      this.creatable = true;
    });
  }
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

  updateTask(c: ITask){
    this.provider.updateTask(c).then(res=>{
      console.log(c.name + ' updated');
    });
  }


  deleteList(c: IList ){
    this.provider.deleteList(c.id).then(res=>{
      console.log(c.name + ' deleted');
      this.provider.getLists('').then(r=>{
        this.lists = r;
      });
    });
  }

  createList(){
    if(this.name != '') {
      this.provider.createList(this.name, this.tasksforecreation).then(res=>{
        this.name = '';
        this.lists.push(res);
      });
    }
  }

  createTask(list1: IList){
    if(this.name1 != '') {
      this.provider.createTask(this.name1, this.due_on, this.status, this.tasklist_id).then(res=>{
        this.name1 = '';
        this.due_on = '';
        this.status = '';
        this.tasks.push(res);
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
    if(this.search){
    this.provider.getLists('?search=' + this.orderchterlists).then(res => {
      this.lists = res;
      this.loading = true;
      this.orderchterlists = '';
    });
  }
  else
  if(this.filter){
    this.provider.getLists('?name=' + this.orderchterlistf).then(res => {
      this.lists = res;
      this.loading = true;
      this.orderchterlistf = '';
    });
  }
  else
  if(this.order){
    if(!this.orderclicked){
    this.provider.getLists('?ordering=name').then(res => {
      this.lists = res;
      this.loading = true;
      this.orderchterlisto = '';
      this.orderclicked = true;
    });
  }
  if(this.orderclicked){
    this.provider.getLists('?ordering=-name').then(res => {
      this.lists = res;
      this.loading = true;
      this.orderchterlisto = '';
      this.orderclicked = false;
    });
  }
  }
  else
  this.provider.getLists('').then(res => {
    this.lists = res;
    this.loading = true;
  });
  }

  makeSearch(){
    this.search = true;
    this.filter = false;
    this.order = false;
  }

  makeFilter(){
    this.search = false;
    this.filter = true;
    this.order = false;  }

  makeOrder(){
    this.search = false;
    this.filter = false;
    this.order = true;  }


    maketSearch(){
      this.tasksearch = true;
      this.taskfilter = false;
      this.taskorder = false;
    }
  
    maketFilter(){
      this.tasksearch = false;
      this.taskfilter = true;
      this.taskorder = false;  }
  
    maketOrder(){
      this.tasksearch = false;
      this.taskfilter = false;
      this.taskorder = true;  }

}
