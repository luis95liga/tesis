import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedcostsComponent } from './fixedcosts.component';

describe('FixedcostsComponent', () => {
  let component: FixedcostsComponent;
  let fixture: ComponentFixture<FixedcostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixedcostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixedcostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
