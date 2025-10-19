import { Component, OnInit } from '@angular/core';
import { ElectricCarDTO } from '../../../../model/ElectricCarDTO';
import { CarsService } from '../../../../services/cars/cars.service';
import { ElectricScooterDTO } from '../../../../model/ElectricScooterDTO';
import { ElectricBicycleDTO } from '../../../../model/ElectricBicycleDTO';
import { VehicleStatus } from '../../../../enums/VehicleStatus';
import { BicycleService } from '../../../../services/bicycle/bicycle.service';
import { ScooterService } from '../../../../services/scooter/scooter.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css'
})
export class VehiclesComponent {
  selectedFile: File | null = null;
  uploadMessage: string = '';

  constructor(
    private carsService: CarsService,
    private bicyclesService: BicycleService,
    private scootersService: ScooterService
  ) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] || null;
  }

  onUploadCSV() {
    if (!this.selectedFile) {
      alert("Please select a CSV file first.");
      return;
    }

    const fileName = this.selectedFile.name.toLowerCase();

    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      const rows = text.split('\n').map(r => r.trim()).filter(r => r.length > 0);

      const headers = rows[0].split(';').map(h => h.trim());

      for (let i = 1; i < rows.length; i++) {
        const values = rows[i].split(';').map(v => v.trim());
        const data: any = {};

        headers.forEach((h, index) => {
          data[h] = values[index];
        });

        if (fileName.startsWith('car')) {
          const newCar: ElectricCarDTO = {
            uniqueId: data.uniqueId,
            manufacturerId: Number(data.manufacturerId),
            manufacturer: data.manufacturer,
            purchasePrice: Number(data.purchasePrice),
            model: data.model,
            hasMalfunction: data.hasMalfunction,
            picture: data.picture || "",
            vehicleStatus: data.vehicleStatus,
            dateOfPurchase: data.dateOfPurchase || new Date().toISOString(),
            description: data.description || ""
          };

          this.carsService.createElectricCar(newCar).subscribe(() => {
            this.uploadMessage = "Car added successfully!";
          });
        }
        else if (fileName.startsWith('bicycle')) {
          const newBike: ElectricBicycleDTO = {
            uniqueId: data.uniqueId,
            manufacturerId: Number(data.manufacturerId),
            manufacturer: data.manufacturer || "",
            purchasePrice: Number(data.purchasePrice),
            model: data.model,
            hasMalfunction: data.hasMalfunction === 'true',
            picture: data.picture || "",
            vehicleStatus: data.vehicleStatus || VehicleStatus.AVAILABLE,
            range: Number(data.range)
          };

          this.bicyclesService.createBike(newBike).subscribe(() => {
            this.uploadMessage = "Bicycle added successfully!";
          });
        }

        else {
          const newScooter: ElectricScooterDTO = {
            uniqueId: data.uniqueId,
            manufacturerId: Number(data.manufacturerId),
            manufacturer: data.manufacturer || "",
            purchasePrice: Number(data.purchasePrice),
            model: data.model,
            hasMalfunction: data.hasMalfunction === 'true',
            picture: data.picture || "",
            vehicleStatus: data.vehicleStatus || VehicleStatus.AVAILABLE,
            maxSpeed: Number(data.maxSpeed)
          };

          this.scootersService.createElectricScooters(newScooter).subscribe(() => {
            this.uploadMessage = "Scooter added successfully!";
          });
        }
      }

      alert("CSV successfully imported!");
    };

    reader.readAsText(this.selectedFile);
  }
}
