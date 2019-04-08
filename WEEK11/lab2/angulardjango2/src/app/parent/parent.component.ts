import { Component, OnInit, Output, Input} from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  public output = "";


  constructor() { }

  ngOnInit() {
  }

}
