import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigntrailerComponent } from './assigntrailer.component';

describe('AssigntrailerComponent', () => {
  let component: AssigntrailerComponent;
  let fixture: ComponentFixture<AssigntrailerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssigntrailerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssigntrailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
