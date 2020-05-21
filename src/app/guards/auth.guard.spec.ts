import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let injector: TestBed;
  let authService: AuthService
  let guard: AuthGuard;
  let routeMock: any = { snapshot: {}};
  let routeStateMock: any = { snapshot: {}, url: '/cookies'};
  let routerMock = {navigate: jasmine.createSpy('navigate')};

  beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [AuthGuard, { provide: Router, useValue: routerMock },],
    imports: [HttpClientTestingModule]
  });
  injector = getTestBed();
  authService = injector.get(AuthService);
  guard = injector.get(AuthGuard);
});

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should redirect an unauthenticated user to the login route', () => {
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should allow the authenticated user to access app', () => {
    spyOn(authService, '$isLoggedIn').and.returnValue(true);
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(false);
  });
});
