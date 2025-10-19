import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MalfunctionDialogComponent } from './malfunction-dialog.component';

describe('MalfunctionDialogComponent', () => {
  let component: MalfunctionDialogComponent;
  let fixture: ComponentFixture<MalfunctionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MalfunctionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MalfunctionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
