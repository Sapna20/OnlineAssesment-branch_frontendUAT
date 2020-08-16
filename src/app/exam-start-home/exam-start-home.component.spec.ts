import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamStartHomeComponent } from './exam-start-home.component';

describe('ExamStartHomeComponent', () => {
  let component: ExamStartHomeComponent;
  let fixture: ComponentFixture<ExamStartHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamStartHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamStartHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
