import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomiComponent } from './homi.component';

describe('HomiComponent', () => {
  let component: HomiComponent;
  let fixture: ComponentFixture<HomiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
