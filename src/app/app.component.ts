import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ApiService } from './services/api.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  title = 'fyle-frontend-challenge';
  private subscription!: Subscription;
  name: string = '';
  avatar_url: string = '';
  url: string = '';
  location: string = '';
  twitter_name: string = '';
  bio: string = '';
  username: string = 'johnpapa';
  tot: any[] = [];

  // Pagination parameters
  currentPage = 1;

  itemsPerPage: number = 10;

  constructor(private apiService: ApiService) {
    
    this.getuserdetails(this.username);
    // this.initializePagination();
  }
  ngAfterViewInit(): void {}
  totalrepos: number = 0;
  showrepodata:boolean=false;
  getuserdetails(username: any) {
    this.apiService.getUser(username).subscribe(
      (result: any) => {
        console.log(result);
        if (result) {
          this.showrepodata = true;
          this.totalrepos = parseInt(result.public_repos);
          this.name = result.name;
          this.url = result.html_url;
          this.avatar_url = result.avatar_url;
          this.location = result.location;
          this.bio = result.bio;
          this.twitter_name = result.twitter_username;
          this.loadRepositories(this.currentPage, this.itemsPerPage, this.username);
          this.initializePagination();
        } else {
          // User not found, handle this case if needed
        }
      },
      (error) => {
        console.error("An error occurred:", error);
        this.showrepodata = false;
        alert("No such user exists please type again");
         // Hide user details section
      }
    );
  }
  

  async initializePagination() {
    this.tot = [];
    this.countpage = Math.ceil(this.totalrepos / this.itemsPerPage);

    for (let i = 1; i <= this.countpage; i++) {
      await this.tot.push(i);
    }
    console.log(this.tot);
  }

  reposarray: any[] = [];
  userdetails: any[] = [];

  ngOnInit() {}
  previouspage: number = 0;

  getvalue() {}

  async loadRepositories(currentPage: any, itemsPerPage: any, username: any) {
    // Call your API service to fetch paginated repositories
    console.log('current page yha h', currentPage);
    this.currentPage = currentPage;
    this.reposarray = [];
    this.subscription = await this.apiService
      .getPaginatedRepositories(currentPage, itemsPerPage, username)
      .subscribe((result: any) => {
        console.log(result.length);
        if (result.length == 0) {
          this.loadRepositories(this.previouspage, itemsPerPage, username);
          this.previouspage = 0;
        } else {
          for (let i = 0; i < result.length; i++) {
            if (result[i].visibility == 'public') {
              const abc: repo = {
                name: result.at(i).name,
                description: result.at(i).description,
                topics: result.at(i).topics,
                html_url: result.at(i).html_url,
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
  countpage: number = 0;
  // Function to load the next page
  loadNextPage() {
    // Calculate the total number of pages based on the total number of repositories and items per page.
    console.log(this.countpage); // Output the total number of pages to the console.

    // Check if there are more pages to load.
    if (this.currentPage < this.countpage) {
      // If the current page is less than the total number of pages...
      this.currentPage++; // Increment the current page number.
      // Call the loadRepositories function to load the repositories for the next page.
      this.loadRepositories(this.currentPage, this.itemsPerPage, this.username);
    } else {
      alert('no page found ');
    }
  }

  changeItemsPerPage() {
    if (this.itemsPerPage < 1) {
      this.itemsPerPage = 10;
    }

    // Reload the first page with the new itemsPerPage value
    this.loadRepositories(this.currentPage, this.itemsPerPage, this.username);
    this.initializePagination();
  }

  onGoToRepo($event: any) {
    console.log($event);
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
