import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-input-user',
  templateUrl: './input-user.component.html',
  styleUrls: ['./input-user.component.scss'],
})
export class InputUserComponent {
  name: any;
  username: string = '';
  @ViewChild('inputElement') inputElement!: ElementRef;

  constructor() {}
  changeusername($event: any) {
    const inputValue = this.inputElement.nativeElement.value;

    this.username = inputValue;
    console.log(this.username);
  }
}
