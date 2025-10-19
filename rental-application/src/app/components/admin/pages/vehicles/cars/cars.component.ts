import { Component, EventEmitter, Output } from '@angular/core';
import { ElectricCarDTO } from '../../../../../model/ElectricCarDTO';
import { CarsService } from '../../../../../services/cars/cars.service';
import { VehicleStatus } from '../../../../../enums/VehicleStatus';
import { MalfunctionDTO } from '../../../../../model/MalfunctionDTO';
import { MalfunctionService } from '../../../../../services/malfunction/malfunction.service';
import { VehicleRentalInfoDTO } from '../../../../../model/VehicleRentalDTO';
import { RentalService } from '../../../../../services/rentals/rental.service';
import { ManufacturerService } from '../../../../../services/manufacturer/manufacturer.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css'
})
export class CarsComponent {

  cars: ElectricCarDTO[] = [];
  columns: string[] = ['id', 'uniqueId', 'model', 'purchasePrice', 'description','Malfunction', 'Rented'];
  page=1;
  pageSize=5;
  isDialogOpen = false;
  selectedCar: ElectricCarDTO | null = null;
  malfunctions: MalfunctionDTO[] = [];
  isMalfunctionDialogOpen = false;
  searchById: string='';
  filteredCars: ElectricCarDTO[] = [];
  rentals: VehicleRentalInfoDTO[] = [];
  showRentalsForCarId: number | null = null;

  manufacturers: any[] = [];

  electricCarFields = [
    { key: 'uniqueId', label: 'Unique ID', type: 'text' },
    { key: 'manufacturerId', label: 'Manufacturer', type: 'select' },
    { key: 'purchasePrice', label: 'Purchase Price', type: 'number' },
    { key: 'model', label: 'Model', type: 'text' },
    { key: 'description', label: 'Description', type: 'text' },
    { key: 'dateOfPurchase', label: 'Date of Purchase', type: 'datetime-local' }
  ];

  constructor(private carsService: CarsService, private malfunctionService: MalfunctionService, private rentalService: RentalService, private manufacturerService: ManufacturerService) {}

  ngOnInit(): void {
    this.loadCars();
    this.loadManufacturers();
  }

  loadCars() {
    this.carsService.getCars().subscribe(data => {
      this.cars = data;
      this.filteredCars = [...data];
    });
  }
  loadManufacturers() {
    this.manufacturerService.getManufacturer().subscribe({
      next: (data) => this.manufacturers = data,
      error: (err) => console.error('Error loading manufacturers', err)
    });
}

  onDelete(car: ElectricCarDTO) {
    if (car.rented) {
      alert('Cannot delete car that is currently rented!');
      return;
    }
    if(confirm("Are you sure? ")) {
      this.carsService.deleteElectricCar(car.id!).subscribe({
        next: () => {
          this.cars = this.cars.filter(
            c=>c.id !== car.id
          );
          this.loadCars();
          alert('Car deleted!');
        },
        error: (error) => {
          console.error('Error during deleting car', error);
          alert('ERROR');
        }
      });
    }

  }
  add() {
    throw new Error('Method not implemented.');
  }

  get pagedCars(): ElectricCarDTO[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredCars.slice(start, start + this.pageSize).map(car => ({
    ...car,
    Malfunction: car.hasMalfunction ? 'YES' : 'NO',
    Rented: car.rented ? 'YES' : 'NO'
  }));
  }

  openDialog() {
    this.isDialogOpen = true;
  }

  onCloseDialog() {
    this.isDialogOpen = false;
  }

  onSaveCar(data: any) {
    const exists = this.cars.some(c => c.uniqueId.toLowerCase() === data.uniqueId.toLowerCase());
    if (exists) {
      alert(`Vehicle with Unique ID "${data.uniqueId}" already exists!`);
      return;
    }

  this.carsService.uploadFile(data.file).subscribe({
    next: (fileName: string) => {
      const carData: ElectricCarDTO = {
        uniqueId: data.uniqueId,
        manufacturerId: data.manufacturerId || null, 
        manufacturer: "", 
        purchasePrice: data.purchasePrice,
        model: data.model,
        hasMalfunction: false,
        rented: false,
        picture: fileName || '', 
        vehicleStatus: VehicleStatus.AVAILABLE,
        dateOfPurchase: data.dateOfPurchase,
        description: data.description
      };

      this.carsService.createElectricCar(carData).subscribe({
        next: () => {
          this.loadCars();            
          this.isDialogOpen = false; 
          alert('Vehicle added successfully!');
        },
        error: (err) => {
          console.error('Error creating car', err);
          alert('Error creating vehicle!');
        }
      });
    },
    error: (err) => {
      console.error('File error during upload', err);
      alert('Error uploading file!');
    }
  });

  }

  onSelectCar(car: ElectricCarDTO) {
    this.selectedCar = car;
    if(car.id) {
      this.loadMalfunctions(car.id);
    }
  }

  loadMalfunctions(vehicleId: number) {
    this.malfunctionService.getMalfunctionsByVehicleId(vehicleId).subscribe({
      next: (malfunctions) => {
        this.malfunctions = malfunctions;
      },
      error:(err) => {
        console.log('err');
      }
    })
  }

  onAddMalfunction(vehicleId: number) {
    this.isMalfunctionDialogOpen = true;
  }
  onCloseMalfunctionDialog() {
    this.isMalfunctionDialogOpen = false;
  }

onSaveMalfunction(malfunction: MalfunctionDTO) {
  this.malfunctionService.createMalfunction(malfunction).subscribe({
    next: () => {
      if (this.selectedCar && this.selectedCar.id) {
        this.malfunctionService.getMalfunctionsByVehicleId(this.selectedCar.id).subscribe({
          next: (malfunctions) => {
            this.malfunctions = malfunctions;
            const updatedCars = this.cars.map(car => {
              if (car.id === this.selectedCar!.id) {
                return { ...car, hasMalfunction: malfunctions.length > 0 };
              }
              return car;
            });
            this.cars = [...updatedCars];

            const updatedFilteredCars = this.filteredCars.map(car => {
              if (car.id === this.selectedCar!.id) {
                return { ...car, hasMalfunction: malfunctions.length > 0 };
              }
              return car;
            });
            this.filteredCars = [...updatedFilteredCars];

            this.isMalfunctionDialogOpen = false;
          },
          error: (err) => {
            console.error('Error loading malfunctions', err);
            alert('Error updating vehicle status after adding malfunction');
          }
        });
      } else {
        this.isMalfunctionDialogOpen = false;
      }
    },
    error: (err) => {
      console.error('Error creating malfunction', err);
      alert('Error adding malfunction!');
    }
  });
}


onDeleteMalfunction(malfunctionId: number) {
  if (confirm('Are you sure?')) {
    this.malfunctionService.deleteMalfunction(malfunctionId).subscribe({
      next: () => {
        if (this.selectedCar && this.selectedCar.id) {
          this.malfunctionService.getMalfunctionsByVehicleId(this.selectedCar.id).subscribe({
            next: (malfunctions) => {
              this.malfunctions = malfunctions;

              const updatedCars = this.cars.map(car => {
                if (car.id === this.selectedCar!.id) {
                  return { ...car, hasMalfunction: malfunctions.length > 0 };
                }
                return car;
              });
              this.cars = [...updatedCars];

              const updatedFilteredCars = this.filteredCars.map(car => {
                if (car.id === this.selectedCar!.id) {
                  return { ...car, hasMalfunction: malfunctions.length > 0 };
                }
                return car;
              });
              this.filteredCars = [...updatedFilteredCars];

              alert('Malfunction deleted successfully');
            },
            error: (err) => {
              console.error('Error reloading malfunctions', err);
              alert('Error updating vehicle status after deleting malfunction');
            }
          });
        }
      },
      error: (err) => {
        console.error('Error deleting malfunction', err);
        alert('Error deleting malfunction');
      }
    });
  }
}


  onCloseVehicleDetails() {
    this.selectedCar = null;
    this.malfunctions = [];
    this.isMalfunctionDialogOpen=false;
  }
onSearch() {
  if(!this.searchById.trim()) {
    this.filteredCars = [...this.cars];
    return;
  }
  const query = this.searchById.trim().toLowerCase();
  this.filteredCars = this.cars.filter(c => 
    c.uniqueId.toLowerCase().includes(query)
  );

  this.page = 1;
}

    onShowRents(car: ElectricCarDTO) {
    if (!car.id) return;

    this.rentalService.getRentalsByVehicleName(car.id).subscribe({
      next: (data) => {
        this.rentals = data;
        this.showRentalsForCarId = car.id!!;
      },
      error: (err) => {
        console.error('Error loading rentals', err);
        this.rentals = [];
      }
    });
  }

  onCloseRents() {
    this.showRentalsForCarId = null;
    this.rentals = [];
  }
    
}
