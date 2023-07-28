import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideeditComponent } from './guideedit.component';

describe('GuideeditComponent', () => {
  let component: GuideeditComponent;
  let fixture: ComponentFixture<GuideeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuideeditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuideeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
