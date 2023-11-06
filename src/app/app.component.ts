import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  name: string = '';
  avatar_url: string = '';
  url: string = '';
  location: string = '';
  twitter_name: string = '';
  bio: string = '';
  username = 'johnpapa';

  // Pagination parameters
  currentPage = 1;
  itemsPerPage: number = 10;

  constructor(private apiService: ApiService) {}

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

  ngOnInit() {
    this.loadRepositories(this.currentPage, this.itemsPerPage, this.username);
    this.getuserdetails(this.username);

    // this.apiService.getRepos(this.username).subscribe((result:any)=>{

    //   for(let i=0;i<result.length;i++){
    //     if(result[i].visibility=='public'){
    //        const abc:repo={
    //         name:result[i].name,
    //         description:result[i].description,
    //         topics:result[i].topics,
    //         html_url:result[i].html_url

    //        }
    //        setTimeout(()=>{

    //         this.reposarray.push(abc);
    //        },1000);

    //       }

    //   }
    // })
  }

  loadRepositories(currentPage: any, itemsPerPage: any, username: any) {
    // Call your API service to fetch paginated repositories
    this.reposarray = [];
    this.apiService
      .getPaginatedRepositories(currentPage, itemsPerPage, username)
      .subscribe((result: any) => {
        for (let i = 0; i < result.length; i++) {
          if (result[i].visibility == 'public') {
            const abc: repo = {
              name: result[i].name,
              description: result[i].description,
              topics: result[i].topics,
              html_url: result[i].html_url,
            };
            setTimeout(() => {
              this.reposarray.push(abc);
            }, 1000);
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
}
interface repo {
  name: string;
  description: string;
  topics: [];
  html_url: string;
}
