import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleUseComponent } from './vehicle-use.component';

describe('VehicleUseComponent', () => {
  let component: VehicleUseComponent;
  let fixture: ComponentFixture<VehicleUseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleUseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
