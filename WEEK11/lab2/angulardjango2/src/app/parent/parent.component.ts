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
    constructor(private provider: ProviderService) { }

  ngOnInit() {
    this.provider.getLists().then(res => {
      this.lists = res;
    this.loading = true;
    });
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
}
