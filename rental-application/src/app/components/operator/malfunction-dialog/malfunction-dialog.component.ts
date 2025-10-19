import { Component, OnInit } from '@angular/core';
import { ElectricCarDTO } from '../../../model/ElectricCarDTO';
import { ElectricBicycleDTO } from '../../../model/ElectricBicycleDTO';
import { ElectricScooterDTO } from '../../../model/ElectricScooterDTO';
import { MalfunctionDTO } from '../../../model/MalfunctionDTO';
import { CarsService } from '../../../services/cars/cars.service';
import { BicycleService } from '../../../services/bicycle/bicycle.service';
import { ScooterService } from '../../../services/scooter/scooter.service';
import { MalfunctionService } from '../../../services/malfunction/malfunction.service';

@Component({
  selector: 'app-malfunction-dialog',
  templateUrl: './malfunction-dialog.component.html',
  styleUrl: './malfunction-dialog.component.css'
})
export class MalfunctionDialogComponent implements OnInit{
onDelete() {
throw new Error('Method not implemented.');
}
  cars: ElectricCarDTO[] = [];
  bicycles: ElectricBicycleDTO[] =[];
  scooters: ElectricScooterDTO[] = [];

  carPage=1;
  bikesPage=1;
  scooterPage=1;
  pageSize=3;
  isMalfunctionDialogOpen = false;
  selectedVehicle: any = null;
  selectedVehicleType: string = '';
  malfunctions: MalfunctionDTO[]=[];

  carColumns: string[]=['id', 'uniqueId', 'model', 'purchasePrice', 'description'];
  bikesColumns: string[]=['uniqueId','model', 'purchasePrice','range'];
  scooterColumns: string[]=['uniqueId','model', 'purchasePrice','maxSpeed'];

  constructor(
    private carsService: CarsService,
    private bikesService: BicycleService,
    private scooterService: ScooterService,
    private malfunctionService: MalfunctionService
  ) {}

  ngOnInit() {
    this.loadCars();
    this.loadBikes();
    this.loadScooters();
  }
  loadCars() {
    this.carsService.getCars().subscribe(data => {
      this.cars = data;
    })
  }
  loadBikes() {
    this.bikesService.getBikes().subscribe(data => {
      this.bicycles = data;
    })
  }
  loadScooters() {
    this.scooterService.getScooters().subscribe(data => {
      this.scooters = data;
    })
  }

  get pagedCars(): ElectricCarDTO[] {
    const start =(this.carPage - 1) * this.pageSize;
    return this.cars.slice(start, start + this.pageSize);
  }
  get pagedBikes(): ElectricBicycleDTO[] {
    const start =(this.bikesPage - 1) * this.pageSize;
    return this.bicycles.slice(start, start + this.pageSize);
  }
  get pagedScooter(): ElectricScooterDTO[] {
    const start =(this.scooterPage - 1) * this.pageSize;
    return this.scooters.slice(start, start + this.pageSize);
  }

  onAddMalfunction(vehicle: any, vehicleType: string) {
    this.selectedVehicle = vehicle;
    this.selectedVehicleType = vehicleType;
    this.isMalfunctionDialogOpen = true;

    if(vehicle.id) {
      this.loadMalfunction(vehicle.id);
    }
  }

  loadMalfunction(vehicleId: number) {
    this.malfunctionService.getMalfunctionsByVehicleId(vehicleId).subscribe({
      next: (malfunctions) => {
        this.malfunctions = malfunctions;
      },
      error:(err) => {
        console.log('Error loading malfunctions', err);
      }
    });
  }

  onCloseMalfunctionDialog() {
    this.isMalfunctionDialogOpen = false;
    this.selectedVehicle = null;
    this.selectedVehicleType = '';
    this.malfunctions=[];
  }

  onSaveMalfunction(malfunction: MalfunctionDTO) {
    this.malfunctionService.createMalfunction(malfunction).subscribe({
      next: () => {
        if(this.selectedVehicle && this.selectedVehicle.id) {
          this.loadMalfunction(this.selectedVehicle.id);
        }
        alert('Malfunction added successfully!');
      },
      error: (err) => {
        console.error('Error adding malffunction', err);
        alert('error');
      }
    })
  }
}
