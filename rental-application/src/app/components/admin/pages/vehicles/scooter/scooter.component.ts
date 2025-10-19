import { Component } from '@angular/core';
import { ElectricScooterDTO } from '../../../../../model/ElectricScooterDTO';
import { ScooterService } from '../../../../../services/scooter/scooter.service';
import { MalfunctionService } from '../../../../../services/malfunction/malfunction.service';
import { VehicleStatus } from '../../../../../enums/VehicleStatus';
import { MalfunctionDTO } from '../../../../../model/MalfunctionDTO';
import { RentalService } from '../../../../../services/rentals/rental.service';
import { VehicleRentalInfoDTO } from '../../../../../model/VehicleRentalDTO';
import { ManufacturerService } from '../../../../../services/manufacturer/manufacturer.service';

@Component({
  selector: 'app-scooter',
  templateUrl: './scooter.component.html',
  styleUrl: './scooter.component.css'
})
export class ScooterComponent {
  scooters: ElectricScooterDTO[] = [];
  columns: string[] = ['id', 'uniqueId', 'model', 'purchasePrice', 'maxSpeed','Malfunction', 'Rented'];
  page=1;
  pageSize=5;
  isDialogOpen = false;
  selectedScooter: ElectricScooterDTO | null = null;
  malfunctions: MalfunctionDTO[] = [];
  isMalfunctionDialogOpen = false;
  searchById: string='';
  filteredScooters: ElectricScooterDTO[] = [];
  rentals: VehicleRentalInfoDTO[] = [];
  showRentalsForCarId: number | null = null;
  manufacturers: any[] = [];
  electricScooterFields = [
    { key: 'uniqueId', label: 'Unique ID', type: 'text' },
    {key: 'manufacturerId', label: 'Manufacturer', type: 'select', options: this.manufacturers.map(m => m.id) },
    { key: 'purchasePrice', label: 'Purchase Price', type: 'number' },
    { key: 'model', label: 'Model', type: 'text' },
    { key: 'maxSpeed', label: 'Max Speed', type: 'number'}
  ];
  
  constructor(private scooterService: ScooterService, private malfunctionService: MalfunctionService, private rentalService: RentalService, private manufacturerService: ManufacturerService) {

  }
  
  ngOnInit(): void {
    this.loadScooter();
    this.loadManufacturers();
  }
  
  loadScooter() {
    this.scooterService.getScooters().subscribe(data => {
      console.log(data)
      this.scooters = data;
      this.filteredScooters = [...data];
    });
  }
    loadManufacturers() {
    this.manufacturerService.getManufacturer().subscribe({
      next: (data) => this.manufacturers = data,
      error: (err) => console.error('Error loading manufacturers', err)
    });
}
  
  onDelete(scooter: ElectricScooterDTO) {
      if (scooter.rented) {
      alert('Cannot delete scooter that is currently rented!');
      return;
    }
  if(confirm("Are you sure?")) {
    this.scooterService.deleteElectricScooter(scooter.id!).subscribe({
      next: () => {
        this.scooters = this.scooters.filter(c => c.id !== scooter.id);
        this.filteredScooters = this.filteredScooters.filter(c => c.id !== scooter.id);
        if(this.selectedScooter?.id === scooter.id) this.selectedScooter = null;

        alert('Scooter deleted successfully!');
      },
      error: (err) => {
        console.error('Error deleting scooter', err);
        alert('Error deleting scooter!');
      }
    });
  }
}

  
  get pagedScooters(): ElectricScooterDTO[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredScooters.slice(start, start + this.pageSize).map(car => ({
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
  
onSaveScooter(data: any) {
    const exists = this.scooters.some(s => s.uniqueId.toLowerCase() === data.uniqueId.toLowerCase());
    if (exists) {
      alert(`Scooter with Unique ID "${data.uniqueId}" already exists!`);
      return;
    }

  this.scooterService.uploadFile(data.file).subscribe({
    next: (fileName: string) => {
      const scooterData: ElectricScooterDTO = {
        uniqueId: data.uniqueId,
        manufacturerId: data.manufacturerId,
        manufacturer: "",
        purchasePrice: data.purchasePrice,
        model: data.model,
        hasMalfunction: false,
        maxSpeed: data.maxSpeed,
        picture: fileName,
        vehicleStatus: VehicleStatus.AVAILABLE
      };
      this.scooterService.createElectricScooters(scooterData).subscribe((createdScooter) => {
        this.scooters = [...this.scooters, createdScooter];
        this.filteredScooters = [...this.filteredScooters, createdScooter];
        this.isDialogOpen = false;
        alert('Scooter added successfully!');
      });
    },
    error: (err) => console.error('File error during upload', err)
  });
}

  onSelectScooter(scooter: ElectricScooterDTO) {
      this.selectedScooter = scooter;
      if(scooter.id) {
        this.loadMalfunctions(scooter.id);
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
    next: (createdMalfunction) => {
      if(this.selectedScooter) {
        this.malfunctions = [...this.malfunctions, createdMalfunction];
        this.scooters = this.scooters.map(s => 
          s.id === this.selectedScooter!.id ? { ...s, hasMalfunction: true } : s
        );
        this.filteredScooters = this.filteredScooters.map(s => 
          s.id === this.selectedScooter!.id ? { ...s, hasMalfunction: true } : s
        );
      }
      this.isMalfunctionDialogOpen = false;
    },
    error: (err) => {
      console.error('Error saving malfunction', err);
      alert('Error saving malfunction!');
    }
  });
}

  
  onDeleteMalfunction(malfunctionId: number) {
  if(confirm('Are you sure?')) {
    this.malfunctionService.deleteMalfunction(malfunctionId).subscribe({
      next: () => {
        this.malfunctions = this.malfunctions.filter(m => m.id !== malfunctionId);
        if(this.selectedScooter) {
          const hasAnyMalfunction = this.malfunctions.length > 0;
          this.scooters = this.scooters.map(s => 
            s.id === this.selectedScooter!.id ? { ...s, hasMalfunction: hasAnyMalfunction } : s
          );
          this.filteredScooters = this.filteredScooters.map(s => 
            s.id === this.selectedScooter!.id ? { ...s, hasMalfunction: hasAnyMalfunction } : s
          );
        }

        alert('Malfunction deleted successfully!');
      },
      error: (err) => {
        console.error('Error deleting malfunction', err);
        alert('Error deleting malfunction!');
      }
    });
  }
}

  onCloseVehicleDetails() {
    this.selectedScooter = null;
    this.malfunctions = [];
    this.isMalfunctionDialogOpen=false;
  }

  onSearch() {
  if (!this.searchById.trim()) {
    this.filteredScooters = [...this.scooters];
    return;
  }

  const searchTerm = this.searchById.toLowerCase();

  this.filteredScooters = this.scooters.filter(s =>
    s.uniqueId.toLowerCase().includes(searchTerm) ||
    s.model.toLowerCase().includes(searchTerm)
  );

  this.page = 1;
}

  onShowRents(s: ElectricScooterDTO) {
          if (!s.id) return;
      
          this.rentalService.getRentalsByVehicleName(s.id).subscribe({
            next: (data) => {
              this.rentals = data;
              this.showRentalsForCarId = s.id!!;
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
