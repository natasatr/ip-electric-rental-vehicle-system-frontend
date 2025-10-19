import { Component } from '@angular/core';
import { ElectricBicycleDTO } from '../../../../../model/ElectricBicycleDTO';
import { MalfunctionDTO } from '../../../../../model/MalfunctionDTO';
import { MalfunctionService } from '../../../../../services/malfunction/malfunction.service';
import { BicycleService } from '../../../../../services/bicycle/bicycle.service';
import { VehicleStatus } from '../../../../../enums/VehicleStatus';
import { VehicleRentalInfoDTO } from '../../../../../model/VehicleRentalDTO';
import { RentalService } from '../../../../../services/rentals/rental.service';
import { ManufacturerService } from '../../../../../services/manufacturer/manufacturer.service';

@Component({
  selector: 'app-bicycle',
  templateUrl: './bicycle.component.html',
  styleUrl: './bicycle.component.css'
})
export class BicycleComponent {

    bikes: ElectricBicycleDTO[] = [];
    columns: string[] = ['id', 'uniqueId', 'model', 'range','Malfunction', 'Rented'];
    page=1;
    pageSize=5;
    isDialogOpen = false;
    selectedBike: ElectricBicycleDTO | null = null;
    malfunctions: MalfunctionDTO[] = [];
    isMalfunctionDialogOpen = false;
    searchById: string='';
    filteredBikes: ElectricBicycleDTO[] = [];
    rentals: VehicleRentalInfoDTO[] = [];
    showRentalsForCarId: number | null = null;
    manufacturers: any[] = [];
  
    electricBikesFields = [
      { key: 'uniqueId', label: 'Unique ID', type: 'text' },
        {key: 'manufacturerId', label: 'Manufacturer', type: 'select', options: this.manufacturers.map(m => m.id) },
      { key: 'purchasePrice', label: 'Purchase Price', type: 'number' },
      { key: 'model', label: 'Model', type: 'text' },
      { key: 'range', label: 'Range', type: 'number' }
    ];
  
    constructor(private bikeService: BicycleService, private malfunctionService: MalfunctionService, private rentalService: RentalService, private manifacturerService: ManufacturerService) {}
  
    ngOnInit(): void {
      this.loadBikes();
      this.loadManufacturers();
    }
  
    loadBikes() {
      this.bikeService.getBikes().subscribe(data => {
        this.bikes = data;
        this.filteredBikes = [...data];
      });
    }
    loadManufacturers() {
        this.manifacturerService.getManufacturer().subscribe({
          next: (data) => this.manufacturers = data,
          error: (err) => console.error('Error loading manufacturers', err)
        });
    }
  
  onDelete(bike: ElectricBicycleDTO) {
    if (bike.rented) {
      alert('Cannot delete bike that is currently rented!');
      return;
    }
  if(confirm("Are you sure? ")) {
    this.bikeService.deleteBike(bike.id!).subscribe({
      next: () => {
        this.bikes = this.bikes.filter(b => b.id !== bike.id);
        this.filteredBikes = this.filteredBikes.filter(b => b.id !== bike.id);
        alert('Bike deleted!');
      },
      error: (error) => {
        console.error('Error during deleting bike', error);
        alert('ERROR');
      }
    });
  }
}
    

    get pagedBikes(): ElectricBicycleDTO[] {
      const start = (this.page - 1) * this.pageSize;
      return this.filteredBikes.slice(start, start + this.pageSize).map(b => ({
    ...b,
    Malfunction: b.hasMalfunction ? 'YES' : 'NO',
    Rented: b.rented ? 'YES' : 'NO'
    }));
    }

    openDialog() {
      this.isDialogOpen = true;
    }
  
    onCloseDialog() {
      this.isDialogOpen = false;
    }
  
    onSaveBike(data: any) {
      const exists = this.bikes.some(bike => bike.uniqueId.toLowerCase() === data.uniqueId.toLowerCase());
      if (exists) {
        alert(`Bike with Unique ID "${data.uniqueId}" already exists!`);
        return;
      }
      this.bikeService.uploadFile(data.file).subscribe({
        next: (fileName: string) => {
          const bikeData: ElectricBicycleDTO = {
            uniqueId: data.uniqueId,
            manufacturerId: data.manufacturerId,
            manufacturer: "",
            purchasePrice: data.purchasePrice,
            model: data.model,
            hasMalfunction: false,
            picture: fileName, 
            vehicleStatus: VehicleStatus.AVAILABLE,
            range: data.range
          };

        this.bikeService.createBike(bikeData).subscribe((createdBike) => {
        
        this.bikes = [...this.bikes, createdBike];
        this.filteredBikes = [...this.filteredBikes, createdBike];

        this.isDialogOpen = false;
        alert('Bike added successfully!');
      });
    },
    error: (err) => console.error('File error during upload', err)
  });
}
  
    onSelectBike(bike: ElectricBicycleDTO) {
      this.selectedBike = bike;
      if(bike.id) {
        this.loadMalfunctions(bike.id);
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
      if(this.selectedBike && this.selectedBike.id) {
        this.malfunctionService.getMalfunctionsByVehicleId(this.selectedBike.id).subscribe({
          next: (malfunctions) => {
            this.malfunctions = malfunctions;
            const updatedBikes = this.bikes.map(bike => {
              if(bike.id === this.selectedBike!.id) {
                return { ...bike, hasMalfunction: malfunctions.length > 0 };
              }
              return bike;
            });
            this.bikes = [...updatedBikes];

            const updatedFilteredBikes = this.filteredBikes.map(bike => {
              if(bike.id === this.selectedBike!.id) {
                return { ...bike, hasMalfunction: malfunctions.length > 0 };
              }
              return bike;
            });
            this.filteredBikes = [...updatedFilteredBikes];

            this.isMalfunctionDialogOpen = false;
          },
          error: (err) => console.error('Error loading malfunctions', err)
        });
      } else {
        this.isMalfunctionDialogOpen = false;
      }
    }, 
    error: (err) => {
      console.error('Error saving malfunction', err);
    }
  });
}

  
    onDeleteMalfunction(malfunctionId: number) {
  if(confirm('Are you sure ? ')) {
    this.malfunctionService.deleteMalfunction(malfunctionId).subscribe({
      next: () => {
        if(this.selectedBike && this.selectedBike.id) {
          this.malfunctionService.getMalfunctionsByVehicleId(this.selectedBike.id).subscribe({
            next: (malfunctions) => {
              this.malfunctions = malfunctions;
              const updatedBikes = this.bikes.map(bike => {
                if(bike.id === this.selectedBike!.id) {
                  return { ...bike, hasMalfunction: malfunctions.length > 0 };
                }
                return bike;
              });
              this.bikes = [...updatedBikes];

              const updatedFilteredBikes = this.filteredBikes.map(bike => {
                if(bike.id === this.selectedBike!.id) {
                  return { ...bike, hasMalfunction: malfunctions.length > 0 };
                }
                return bike;
              });
              this.filteredBikes = [...updatedFilteredBikes];

            },
            error: (err) => console.error('Error loading malfunctions', err)
          });
        }
        alert('Malfunction deleted successfully');
      },
      error: (err) => {
        console.log('Error deleting malfunction', err);
        alert('Error deleting malfunction');
      }
    });
  }
}
    onCloseVehicleDetails() {
      this.selectedBike = null;
      this.malfunctions = [];
      this.isMalfunctionDialogOpen=false;
    }
    onSearch() {
      if(!this.searchById.trim()) {
      this.filteredBikes = [...this.bikes];
      return;
    } 
    const bike = this.bikes.find(c => c.uniqueId.toLowerCase() === this.searchById.toLowerCase());

    if(bike) {
      this.bikeService.getBikeById(bike.id!).subscribe({
        next: (bike) => {
          this.filteredBikes = [bike];
          this.page = 1;
        },
        error: () => {
          this.filteredBikes = [];
        }
      });
    } else {
      this.filteredBikes = [];
    }
    }
    onShowRents(bike: ElectricBicycleDTO) {
  if (!bike.id) return;

  this.rentalService.getRentalsByVehicleName(bike.id).subscribe({
    next: (data) => {
      this.rentals = data;
      this.showRentalsForCarId = bike.id!;

      
      this.bikeService.getBikeById(bike.id!).subscribe({
        next: (updatedBike) => {
          this.bikes = this.bikes.map(b => b.id === updatedBike.id ? updatedBike : b);
          this.filteredBikes = this.filteredBikes.map(b => b.id === updatedBike.id ? updatedBike : b);
        }
      });
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
