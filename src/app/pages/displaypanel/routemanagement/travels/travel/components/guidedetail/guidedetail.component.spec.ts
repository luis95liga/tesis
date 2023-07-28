import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidedetailComponent } from './guidedetail.component';

describe('GuidedetailComponent', () => {
  let component: GuidedetailComponent;
  let fixture: ComponentFixture<GuidedetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuidedetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuidedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
