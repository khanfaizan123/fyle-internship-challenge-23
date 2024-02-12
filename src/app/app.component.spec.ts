import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatDialogModule,MatDialog} from '@angular/material/dialog';

import {MatFormFieldModule} from '@angular/material/form-field';


import { HttpClientModule } from '@angular/common/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [AppComponent],
    imports: [HttpClientModule,MatDialogModule,MatFormFieldModule]
  }));

  


  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  
});
