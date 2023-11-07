import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiService, RepositoryResponse } from './api.service';

describe('ApiService', () => {
  let apiService: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule for HTTP testing
      providers: [ApiService],
    });

    // Create a new instance of the service and HttpTestingController before each test
    apiService = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(apiService).toBeTruthy();
  });

  it('should retrieve paginated repositories from the API', () => {
    const githubUsername = 'exampleUser';
    const page = 1;
    const itemsPerPage = 10;
    const mockResponse: RepositoryResponse = {
      items: [], // Mock data
      totalItems: 0,
      totalPages: 0,
      currentPage: 0,
    };

    // Make an HTTP GET request
    apiService.getPaginatedRepositories(page, itemsPerPage, githubUsername).subscribe((response) => {
      expect(response).toEqual(mockResponse); // Check if the response matches the expected data
    });

    const req = httpTestingController.expectOne(
      (request) =>
        request.url === `https://api.github.com/users/${githubUsername}/repos?per_page=${itemsPerPage}&page=${page}` &&
        request.method === 'GET'
    );

    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse); // Provide a mock response

    httpTestingController.verify(); // Ensure that there are no outstanding requests
  });
});
