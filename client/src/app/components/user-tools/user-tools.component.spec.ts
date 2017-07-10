import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserToolsComponent } from './user-tools.component';

describe('UserToolsComponent', () => {
  let component: UserToolsComponent;
  let fixture: ComponentFixture<UserToolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserToolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
