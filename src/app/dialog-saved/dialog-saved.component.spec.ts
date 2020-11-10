import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSavedComponent } from './dialog-saved.component';

describe('DialogSavedComponent', () => {
  let component: DialogSavedComponent;
  let fixture: ComponentFixture<DialogSavedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSavedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
