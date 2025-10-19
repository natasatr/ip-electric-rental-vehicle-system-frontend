import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClientDTO } from '../../../../../model/ClientDTO';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.css'
})
export class ClientDetailsComponent {
  @Input() client: ClientDTO | null = null;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

}
