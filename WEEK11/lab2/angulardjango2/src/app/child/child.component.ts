import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {


  @Input() title = '';
  @Output() output = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  sendMessage(){
    this.output.emit('Message from child');
  }

}
