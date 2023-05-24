import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KidpaorLayoutComponent } from './kidpaor-layout.component';

describe('KidpaorLayoutComponent', () => {
  let component: KidpaorLayoutComponent;
  let fixture: ComponentFixture<KidpaorLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KidpaorLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KidpaorLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
