import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VehicleDTO } from '../../../model/VehicleDTO';
import { MalfunctionDTO } from '../../../model/MalfunctionDTO';
import { VehicleStatus } from '../../../enums/VehicleStatus';

@Component({
  selector: 'app-details-vehicle',
  templateUrl: './details-vehicle.component.html',
  styleUrl: './details-vehicle.component.css'
})
export class DetailsVehicleComponent {
  @Input() vehicle: VehicleDTO | null = null;
  @Input() malfunctions: MalfunctionDTO[] = [];
  @Input() vehicleType: 'car' | 'bicycle' | 'scooter' = 'car';
  @Output() addMalfunction = new EventEmitter<number>();
  @Output() deleteMalfunction = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();
  @Output() saveMalfunction = new EventEmitter<MalfunctionDTO>;

  getVehicleDetails(): any {
    if(!this.vehicle) return {};

    switch(this.vehicleType) {
      case 'car': 
        const car = this.vehicle as any;
        return {
          'date of pur': car.dateOfPurchase,
          'description': car.description
        };
        case 'bicycle': 
        const bike = this.vehicle as any;
        return {
          'Range': bike.range+' km'
        };
        case 'scooter': 
        return {

        };
        default: 
          return {};
    }
  }

  OnAddMalfunction() {
    if(this.vehicle && this.vehicle.id) {
      this.addMalfunction.emit(this.vehicle.id);
    }
  }
  OnDeleteMalfunction(malfunctionId: number) {
    return this.deleteMalfunction.emit(malfunctionId);
  }

  onClose() {
    this.close.emit();
  }
  getStatusText(status: VehicleStatus): string {
    return VehicleStatus[status as keyof typeof VehicleStatus];
  }

  onSaveMalfunction(malfunction: MalfunctionDTO) {
    this.saveMalfunction.emit(malfunction);
  }

}
