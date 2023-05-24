import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AdminService } from './admin.service';
import { environment } from 'src/environments/environment';

describe('AdminService', () => {
  let service: AdminService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdminService]
    });
    service = TestBed.inject(AdminService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a DELETE request to the API with the given user ID', () => {
    const userId = '1';

    service.deleteUser(userId);

    const req = httpMock.expectOne(`${ environment.apiUrl }Users/${ userId }`);
    expect(req.request.method).toEqual('DELETE');
  });

  it('should retrieve parents from API', () => {
    const parents = [{ id: 1, name: 'John' }];
    service.getParents();
    const req = httpMock.expectOne(`${ service.baseUrl }Parents`);
    expect(req.request.method).toBe('GET');
    req.flush(parents);
    expect(service.data.parentsAll$).toBeTruthy();
  });

  it('should retrieve activities-list from API', () => {
    const activities = [{ id: 1, name: 'Swimming' }];
    service.getActivities();
    const req = httpMock.expectOne(`${ service.baseUrl }Activities`);
    expect(req.request.method).toBe('GET');
    req.flush(activities);
    expect(service.data.activitiesAll$).toBeTruthy();
  });

  it('should add new activity-detail to API', () => {
    const activity = { name: 'Running' };
    service.addActivity(activity);
    const req = httpMock.expectOne(`${ service.baseUrl }Activities`);
    expect(req.request.method).toBe('POST');
    req.flush({});
    expect(service.getActivities).toHaveBeenCalled();
  });

  it('should update an activity-detail', () => {
    const dummyActivity = { id: '1', name: 'Activity 1' };

    service.updateActivity('1', dummyActivity);

    const req = httpMock.expectOne(`${ service.baseUrl }Activities/${dummyActivity.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyActivity);

    service.data.activitiesAll$.subscribe(activities => {
      expect(activities).toContain(dummyActivity);
    });
  });

  it('should delete an activity-detail', () => {
    const dummyActivity = { id: '1' };

    service.deleteActivity(dummyActivity.id);

    const req = httpMock.expectOne(`${ service.baseUrl }Activities/${dummyActivity.id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyActivity);

    service.data.activitiesAll$.subscribe(activities => {
      expect(activities).toContain(dummyActivity);
    });
  });
})
