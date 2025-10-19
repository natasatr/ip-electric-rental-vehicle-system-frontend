import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeDTO } from '../../../model/EmployeeDTO';
import { Role } from '../../../enums/Role';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.css'
})
export class EditUserDialogComponent {
  @Input() isOpen = false;
  @Input() employee: EmployeeDTO | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<EmployeeDTO>();
  roles = Object.values(Role);
  employeeFields = [
    { key: 'firstName', label: 'Name', type: 'text' },
    { key: 'lastName', label: 'Last name', type: 'text' },
    { key: 'username', label: 'Username', type: 'text' },
    { key: 'role', label: 'Role', type: 'select', options: this.roles }
  ];

  onSave() {
    if(this.employee) {
      this.save.emit(this.employee);
    }
  }

  onClose() {
    this.close.emit();
  }
}
