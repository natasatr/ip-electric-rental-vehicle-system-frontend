import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MalfunctionDTO } from '../../../../../model/MalfunctionDTO';


@Component({
  selector: 'app-malfunction',
  templateUrl: './malfunction.component.html',
  styleUrl: './malfunction.component.css'
})
export class MalfunctionComponent {
  @Input() isOpen = false;
  @Input() vehicleId: number | null = null;
  @Input() vehicleModel: string = '';
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  formData: MalfunctionDTO = {
    description: '',
    dateTimeMalfunction: new Date().toISOString().slice(0,16),
    vehicleId: this.vehicleId || 0
  };

  constructor() {}

  ngOnChanges() {
    if(this.vehicleId) {
      this.formData.vehicleId = this.vehicleId;
    }
  }

  onSave() {
    if(this.vehicleId) {
      const malfunctionData: MalfunctionDTO ={
        description: this.formData.description,
        dateTimeMalfunction: this.formData.dateTimeMalfunction,
        vehicleId: this.vehicleId
      };
      this.save.emit(malfunctionData);
      this.close.emit();
    }
  }

  onClose() {
    this.formData = {
      description: '',
      dateTimeMalfunction: new Date().toISOString().slice(0,16),
      vehicleId: this.vehicleId || 0
    };
    this.close.emit();
  }
}
