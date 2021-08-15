import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NestedJsonFormComponent } from './nested-json-form.component';

describe('JsonFormComponent', () => {
  let component: NestedJsonFormComponent;
  let fixture: ComponentFixture<NestedJsonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NestedJsonFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedJsonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
