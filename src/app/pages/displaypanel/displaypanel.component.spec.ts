import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaypanelComponent } from './displaypanel.component';

describe('DisplaypanelComponent', () => {
  let component: DisplaypanelComponent;
  let fixture: ComponentFixture<DisplaypanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaypanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplaypanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
