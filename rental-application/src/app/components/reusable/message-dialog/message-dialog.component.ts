import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrl: './message-dialog.component.css'
})
export class MessageDialogComponent {

  @Input() isOpen = false;
  @Input() message = '';
  @Input() type: 'success' | 'error' | 'warning' = 'success';

  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
