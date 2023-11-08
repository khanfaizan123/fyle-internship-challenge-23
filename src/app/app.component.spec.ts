import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatDialogModule,MatDialog} from '@angular/material/dialog';

import {MatFormFieldModule} from '@angular/material/form-field';


import { HttpClientModule } from '@angular/common/http';
import { InputUserComponent } from './components/input-user/input-user.component';
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

  it(`should have as title 'fyle-frontend-challenge'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app.title).toEqual('fyle-frontend-challenge');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); 
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('fyle-frontend-challenge');
  });
});
