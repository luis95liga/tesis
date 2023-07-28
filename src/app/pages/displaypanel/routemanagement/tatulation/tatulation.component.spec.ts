import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TatulationComponent } from './tatulation.component';

describe('TatulationComponent', () => {
  let component: TatulationComponent;
  let fixture: ComponentFixture<TatulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TatulationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TatulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
