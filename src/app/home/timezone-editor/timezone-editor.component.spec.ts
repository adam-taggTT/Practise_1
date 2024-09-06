import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimezoneEditorComponent } from './timezone-editor.component';

describe('TimezoneEditorComponent', () => {
  let component: TimezoneEditorComponent;
  let fixture: ComponentFixture<TimezoneEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimezoneEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimezoneEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
