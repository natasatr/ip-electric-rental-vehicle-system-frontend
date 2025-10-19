import { Component } from '@angular/core';
import { ManufacturerDTO } from '../../../../model/ManufacturerDTO';
import { ManufacturerService } from '../../../../services/manufacturer/manufacturer.service';

@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrl: './manufacturer.component.css'
})
export class ManufacturerComponent {

  manufacturer: ManufacturerDTO[] = [];
  columns: string[] = [ 'name', 'country', 'address', 'phone','fax', 'email'];
  page=1;
  pageSize=5;
  isDialogOpen = false;
  selectedManufacture: ManufacturerDTO | null = null;
  isEditDialogOpen = false;
  searchUsername: string='';
  filteredManufacturer: ManufacturerDTO[]=[];

  messageDialogOpen = false;
  messageDialogText = '';
  messageDialogType: 'success' | 'error' | 'warning' = 'success';
  
  manufactureFields = [
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'country', label: 'Country', type: 'text' },
    { key: 'address', label: 'Address', type: 'text' },
    { key: 'phone', label: 'Phone', type: 'text' },
    { key: 'fax', label: 'Fax', type: 'text' },
    { key: 'email', label: 'Email', type: 'text' }
  ];
  
  constructor(private manufactureService: ManufacturerService) {}
  
  ngOnInit(): void {
    this.loadManufacturer();
  }
  
  loadManufacturer() {
    this.manufactureService.getManufacturer().subscribe(data => {
      this.manufacturer = data;
      this.filteredManufacturer = [...data];
    });
  }

  get pagedManufacturer(): ManufacturerDTO[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredManufacturer.slice(start, start + this.pageSize)
  }

  onDelete(man: ManufacturerDTO) {
  if(confirm("Are you sure? ")) {
    this.manufactureService.deleteManufacturer(man.id!).subscribe({
      next: () => {
        this.loadManufacturer();
        this.showMessage('Manufacturer deleted!', 'success');
      },
      error: (error) => {
        console.error('Error during deleting manufacturer', error);
        this.showMessage('ERROR during delete!', 'error');
      }
    });
  }
}


showMessage(message: string, type: 'success' | 'error' | 'warning' = 'success') {
  this.messageDialogText = message;
  this.messageDialogType = type;
  this.messageDialogOpen = true;
}

closeMessage() {
  this.messageDialogOpen = false;
}
  onSelectManufacturer(man: ManufacturerDTO) {
    this.selectedManufacture = {...man};
    this.isEditDialogOpen = true;
  }

  addManufacturerDialog() {
    this.isDialogOpen = true;
  }
  onSaveManufacturer(data: any) {
    const manufacturer: ManufacturerDTO = {
      name: data.name,
      country: data.country,
      address: data.address,
      phone: data.phone, 
      fax: data.fax,
      email: data.email
    };
    this.manufactureService.createManufacturer(manufacturer).subscribe(()=> {
      this.loadManufacturer();
    });
  }

  onCloseEditDialog() {
    this.isEditDialogOpen = false;
    this.selectedManufacture = null;
  }
  onCloseDialog() {
    this.isDialogOpen = false;
  }

onUpdateManufacturer() {
  if(this.selectedManufacture && this.selectedManufacture.id) {
    this.manufactureService.updateManufacturer(this.selectedManufacture).subscribe({
      next: () => {
        this.loadManufacturer(); 
        this.isEditDialogOpen = false;
        this.selectedManufacture = null;
        this.showMessage('Manufacturer updated!', 'success');
      },
      error:(err) => {
        console.log('error during update', err);
      }
    });
  }
}


onSearch() {
  if (!this.searchUsername.trim()) {
    this.filteredManufacturer = [...this.manufacturer];
    return;
  }

  const search = this.searchUsername.toLowerCase();


  let result = this.manufacturer.filter(c =>
    c.name.toLowerCase().startsWith(search)
  );

  if (result.length === 0) {
    result = this.manufacturer.filter(c =>
      c.name.toLowerCase().includes(search)
    );
  }

  this.filteredManufacturer = result;
  this.page = 1;
}

}
