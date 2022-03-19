import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sidebar2Component } from './sidebar2.component';

describe('Sidebar2Component', () => {
  let component: Sidebar2Component;
  let fixture: ComponentFixture<Sidebar2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sidebar2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Sidebar2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
