import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { permissionCheckGuard } from './permission-check.guard';

describe('permissionCheckGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => permissionCheckGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
