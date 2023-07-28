import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellarsComponent } from './cellars.component';

describe('CellarsComponent', () => {
  let component: CellarsComponent;
  let fixture: ComponentFixture<CellarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellarsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CellarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
