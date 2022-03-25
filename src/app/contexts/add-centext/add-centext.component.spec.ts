import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCentextComponent } from './add-centext.component';

describe('AddCentextComponent', () => {
  let component: AddCentextComponent;
  let fixture: ComponentFixture<AddCentextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCentextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCentextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
