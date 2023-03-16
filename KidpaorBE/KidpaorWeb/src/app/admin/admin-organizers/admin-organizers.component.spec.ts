import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrganizersComponent } from './admin-organizers.component';

describe('AdminOrganizersComponent', () => {
  let component: AdminOrganizersComponent;
  let fixture: ComponentFixture<AdminOrganizersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrganizersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminOrganizersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
