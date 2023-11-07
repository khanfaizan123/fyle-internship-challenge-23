import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RepoComponentComponent } from './repo-component.component';

describe('RepoComponentComponent', () => {
  let component: RepoComponentComponent;
  let fixture: ComponentFixture<RepoComponentComponent>;

  // Mock Router
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepoComponentComponent],
      providers: [{ provide: Router, useValue: routerSpy }],
    });
    fixture = TestBed.createComponent(RepoComponentComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit goToRepoEvent when gotorepo is called', () => {
    const mockUrl = 'https://github.com/voidChetan/eCommerce';
    component.html_url = mockUrl;
    spyOn(component.goToRepoEvent, 'emit');

    component.gotorepo();

    expect(component.goToRepoEvent.emit).toHaveBeenCalledWith(mockUrl);
  });

  // it('should navigate to the specified URL when gotorepo is called', () => {
  //   const mockUrl = 'https://github.com/voidChetan/eCommerce';
  //   component.html_url = mockUrl;

  //   component.gotorepo();

  //   expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(mockUrl);
  // });
});
