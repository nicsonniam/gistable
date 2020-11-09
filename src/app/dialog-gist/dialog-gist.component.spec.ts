import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGistComponent } from './dialog-gist.component';

describe('DialogGistComponent', () => {
  let component: DialogGistComponent;
  let fixture: ComponentFixture<DialogGistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogGistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogGistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
