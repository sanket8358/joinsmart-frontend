import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotoficationsPage } from './notofications.page';

describe('NotoficationsPage', () => {
  let component: NotoficationsPage;
  let fixture: ComponentFixture<NotoficationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotoficationsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotoficationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
