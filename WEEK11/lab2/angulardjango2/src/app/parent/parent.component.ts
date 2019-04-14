import { Component, OnInit, Output, Input} from '@angular/core';
import { ProviderService } from '../shared/services/provider.service';
import { IList } from '../shared/models/models';

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

  constructor(private provider: ProviderService) { }

  ngOnInit() {
    this.provider.getLists().then(res => {
      this.lists = res;
      /* setTimeout(()=>{
        this.loading = true;
      }, 100);
    }) */
    this.loading = true;
    });
  }

  sendMessageViaService(){
    this.provider.sendMessage.emit('smth');
  }
}
