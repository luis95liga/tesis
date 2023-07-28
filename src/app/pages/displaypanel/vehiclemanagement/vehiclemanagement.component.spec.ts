import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclemanagementComponent } from './vehiclemanagement.component';

describe('VehiclemanagementComponent', () => {
  let component: VehiclemanagementComponent;
  let fixture: ComponentFixture<VehiclemanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclemanagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiclemanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
