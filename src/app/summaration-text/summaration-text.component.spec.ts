import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarationTextComponent } from './summaration-text.component';

describe('SummarationTextComponent', () => {
  let component: SummarationTextComponent;
  let fixture: ComponentFixture<SummarationTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummarationTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummarationTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
