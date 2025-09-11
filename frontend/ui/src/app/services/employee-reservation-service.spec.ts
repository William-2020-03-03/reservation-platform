import { TestBed } from '@angular/core/testing';

import { EmployeeReservationService } from './employee-reservation-service';

describe('EmployeeReservationService', () => {
  let service: EmployeeReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
