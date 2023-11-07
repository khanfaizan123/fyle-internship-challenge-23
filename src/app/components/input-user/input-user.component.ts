import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-input-user',
  templateUrl: './input-user.component.html',
  styleUrls: ['./input-user.component.scss'],
})
export class InputUserComponent {
  name: any;
  username: string = '';
  @ViewChild('inputElement') inputElement!: ElementRef;

  constructor(private api: ApiService) {}
  changeusername($event: any) {
    const inputValue = this.inputElement.nativeElement.value;

    this.username = inputValue;
    console.log(this.username);
  }
}
