import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-repo-component',
  templateUrl: './repo-component.component.html',
  styleUrls: ['./repo-component.component.scss']
})
export class RepoComponentComponent implements OnInit {

 
  @Input() name:string="";
  @Input()  description:string="";
  @Input()  html_url:string="";
  @Input() topics:any[]=[];
  @Output() goToRepoEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(){

  }
  
  ngOnInit(): void {
     
  }

  gotorepo(){
   
    this.goToRepoEvent.emit(this.html_url);
  }

}
