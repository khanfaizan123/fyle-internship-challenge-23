import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule,MatDialog,MatDialogContent} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClient, HttpClientModule } from  '@angular/common/http';
import { RepoComponentComponent } from './components/repo-component/repo-component.component';
import { InputUserComponent } from './components/input-user/input-user.component';

@NgModule({
  declarations: [
    AppComponent,
    RepoComponentComponent,
    InputUserComponent
  
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
   MatButtonModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [HttpClient,MatDialog],
 
  bootstrap: [AppComponent]
}) 
export class AppModule { }
