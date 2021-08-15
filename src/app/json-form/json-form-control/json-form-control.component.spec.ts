import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonFormControlComponent } from './json-form-control.component';

describe('JsonFormControlComponent', () => {
  let component: JsonFormControlComponent;
  let fixture: ComponentFixture<JsonFormControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsonFormControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
