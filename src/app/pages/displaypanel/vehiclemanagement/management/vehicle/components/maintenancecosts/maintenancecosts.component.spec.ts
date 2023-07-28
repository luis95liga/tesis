import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenancecostsComponent } from './maintenancecosts.component';

describe('MaintenancecostsComponent', () => {
  let component: MaintenancecostsComponent;
  let fixture: ComponentFixture<MaintenancecostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenancecostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintenancecostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
