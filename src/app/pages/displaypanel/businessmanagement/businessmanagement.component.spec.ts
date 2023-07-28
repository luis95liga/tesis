import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessmanagementComponent } from './businessmanagement.component';

describe('BusinessmanagementComponent', () => {
  let component: BusinessmanagementComponent;
  let fixture: ComponentFixture<BusinessmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessmanagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
