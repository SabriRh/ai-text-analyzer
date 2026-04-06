import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthButtonComponent } from './health-button.component';

describe('HealthButtonComponent', () => {
  let component: HealthButtonComponent;
  let fixture: ComponentFixture<HealthButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
