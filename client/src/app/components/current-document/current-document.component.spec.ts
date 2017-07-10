import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentDocumentComponent } from './current-document.component';

describe('CurrentDocumentComponent', () => {
  let component: CurrentDocumentComponent;
  let fixture: ComponentFixture<CurrentDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
