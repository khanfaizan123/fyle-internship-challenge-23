import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router:Router){

  }
  
  ngOnInit(): void {
      // console.log("yhan hai",this.name,this.description,this.html_url,this.topics);
       
  }

  gotorepo(){
   
    this.goToRepoEvent.emit(this.html_url);
  }

}
