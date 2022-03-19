import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentextComponent } from './centext.component';

describe('CentextComponent', () => {
  let component: CentextComponent;
  let fixture: ComponentFixture<CentextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CentextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
