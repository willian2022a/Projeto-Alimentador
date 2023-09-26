import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroFilhoComponent } from './registro-filho.component';

describe('RegistroFilhoComponent', () => {
  let component: RegistroFilhoComponent;
  let fixture: ComponentFixture<RegistroFilhoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroFilhoComponent]
    });
    fixture = TestBed.createComponent(RegistroFilhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
