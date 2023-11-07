import { Component, OnInit,OnDestroy } from '@angular/core';
import { ApiService } from './services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { InputUserComponent } from './components/input-user/input-user.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit,OnDestroy {
  title = 'fyle-frontend-challenge';
  private subscription!: Subscription;
  name: string = '';
  avatar_url: string = '';
  url: string = '';
  location: string = '';
  twitter_name: string = '';
  bio: string = '';
  username: string = '';

  // Pagination parameters
  currentPage = 1;
  itemsPerPage: number = 10;

  constructor(private apiService: ApiService, public dialog: MatDialog) {
    this.openDialog();
  }

  openDialog() {
    let dialogRef = this.dialog.open(InputUserComponent, {
      height:'200px',
      width: '300px',
      
      panelClass:"dialog-flex" 
     
    });
    
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.username = result;
      if (this.username == '') {
        alert('No match found for this username on github please type again');
        this.openDialog();
      } else {
        this.loadRepositories(
          this.currentPage,
          this.itemsPerPage,
          this.username
        );
        this.getuserdetails(this.username);
      }
    });
  }

  getuserdetails(username: any) {
    this.apiService.getUser(username).subscribe((result: any) => {
      (this.name = result.name),
        (this.url = result.html_url),
        (this.avatar_url = result.avatar_url),
        (this.location = result.location),
        (this.bio = result.bio),
        (this.twitter_name = result.twitter_username);
    });
  }

  reposarray: any[] = [];
  userdetails: any[] = [];

  ngOnInit() {}
  previouspage: number = 0;
  loadRepositories(currentPage: any, itemsPerPage: any, username: any) {
    // Call your API service to fetch paginated repositories
    this.reposarray = [];
    this.subscription=this.apiService
      .getPaginatedRepositories(currentPage, itemsPerPage, username)
      .subscribe((result: any) => {
        console.log(result.length);
        if (result.length == 0) {
          alert('No more repos found');

          this.loadRepositories(this.previouspage, itemsPerPage, username);
        } else {
          for (let i = 0; i < result.length; i++) {
            if (result[i].visibility == 'public') {
              const abc: repo = {
                name: result[i].name,
                description: result[i].description,
                topics: result[i].topics,
                html_url: result[i].html_url,
              };

              this.previouspage = this.currentPage;
              this.reposarray.push(abc);
            }
          }
        }
      });
  }

  loadPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadRepositories(this.currentPage, this.itemsPerPage, this.username);
    }
  }

  // Function to load the next page
  loadNextPage() {
    this.currentPage++;
    this.loadRepositories(this.currentPage, this.itemsPerPage, this.username);
  }

  changeItemsPerPage() {
    if (this.itemsPerPage < 1) {
      this.itemsPerPage = 10;
    }

    // Reload the first page with the new itemsPerPage value
    this.loadRepositories(this.currentPage, this.itemsPerPage, this.username);
  }

  onGoToRepo($event: any) {
    console.log($event, 'yha se aa rha h');
    window.open($event);
  }

  changerepobyname() {
    this.loadRepositories(this.currentPage, this.itemsPerPage, this.username);
    this.getuserdetails(this.username);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); // Unsubscribe to prevent memory leaks
  }
}
interface repo {
  name: string;
  description: string;
  topics: [];
  html_url: string;
}
