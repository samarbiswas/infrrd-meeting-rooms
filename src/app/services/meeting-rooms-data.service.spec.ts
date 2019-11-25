import { TestBed } from '@angular/core/testing';

import { MeetingRoomsDataService } from './meeting-rooms-data.service';

describe('MeetingRoomsDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MeetingRoomsDataService = TestBed.get(MeetingRoomsDataService);
    expect(service).toBeTruthy();
  });
});
