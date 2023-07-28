import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtracostsComponent } from './extracosts.component';

describe('ExtracostsComponent', () => {
  let component: ExtracostsComponent;
  let fixture: ComponentFixture<ExtracostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtracostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtracostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
