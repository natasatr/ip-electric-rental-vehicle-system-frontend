import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditManufacturerDialogComponent } from './edit-manufacturer-dialog.component';

describe('EditManufacturerDialogComponent', () => {
  let component: EditManufacturerDialogComponent;
  let fixture: ComponentFixture<EditManufacturerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditManufacturerDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditManufacturerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
