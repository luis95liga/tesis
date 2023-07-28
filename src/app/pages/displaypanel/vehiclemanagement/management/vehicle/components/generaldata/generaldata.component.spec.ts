import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneraldataComponent } from './generaldata.component';

describe('GeneraldataComponent', () => {
  let component: GeneraldataComponent;
  let fixture: ComponentFixture<GeneraldataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneraldataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneraldataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
