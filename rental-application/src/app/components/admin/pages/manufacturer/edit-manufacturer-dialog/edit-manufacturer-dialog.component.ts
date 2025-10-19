import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ManufacturerDTO } from '../../../../../model/ManufacturerDTO';
import { EventType } from '@angular/router';

@Component({
  selector: 'app-edit-manufacturer-dialog',
  templateUrl: './edit-manufacturer-dialog.component.html',
  styleUrl: './edit-manufacturer-dialog.component.css'
})
export class EditManufacturerDialogComponent {
  @Input() isOpen = false;
  @Input() manufacturer: ManufacturerDTO | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<ManufacturerDTO>();

  manufactureFields = [
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'country', label: 'Country', type: 'text' },
    { key: 'address', label: 'Address', type: 'text' },
    { key: 'phone', label: 'Phone', type: 'text' },
    { key: 'fax', label: 'Fax', type: 'text' },
    { key: 'email', label: 'Email', type: 'text' }
  ];

  onSave() {
    if(this.manufacturer) {
      this.save.emit(this.manufacturer);
    }
  }

  onClose() {
    this.close.emit();
  }
}
