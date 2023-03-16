import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminParentsComponent } from './admin-parents.component';

describe('AdminParentsComponent', () => {
  let component: AdminParentsComponent;
  let fixture: ComponentFixture<AdminParentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminParentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminParentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
