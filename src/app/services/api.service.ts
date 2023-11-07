import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getUser(githubUsername: string) {
    return this.httpClient.get(
      `https://api.github.com/users/${githubUsername}`
    );
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params

  getPaginatedRepositories(
    page: number,
    itemsPerPage: number,
    githubUsername: string
  ): Observable<RepositoryResponse> {
    // Build the query parameters
    // const params = new HttpParams()
    //   .set('page', page.toString())
    //   .set('itemsPerPage','10');

    // Make an HTTP GET request to your API
    return this.httpClient.get<RepositoryResponse>(
      `https://api.github.com/users/${githubUsername}/repos?per_page=${itemsPerPage}&page=${page}`
    );
  }
  // https://api.github.com/repositories/1300192/issues?per_page=2&page=2
}

export interface RepositoryResponse {
  items: Repository[]; // An array of repositories
  totalItems: number; // The total number of repositories (optional)
  totalPages: number; // The total number of pages (optional)
  currentPage: number; // The current page (optional)
}

export interface Repository {
  id: number;
  name: string;
  description: string;
  // Add other properties based on your API response
}
