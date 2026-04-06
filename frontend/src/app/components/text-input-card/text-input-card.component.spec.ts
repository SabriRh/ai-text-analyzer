import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextInputCardComponent } from './text-input-card.component';

describe('TextInputCardComponent', () => {
  let component: TextInputCardComponent;
  let fixture: ComponentFixture<TextInputCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextInputCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextInputCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
