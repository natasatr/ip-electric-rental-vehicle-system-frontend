import { Component, OnInit } from '@angular/core';
import { ClientDTO } from '../../../../model/ClientDTO';
import { ClientService } from '../../../../services/clients/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit{

  clients: ClientDTO[] = [];
  columns: string[] = [ 'firstName', 'lastName', 'username','role', 'blocked'];
  page=1;
  pageSize=5;
  isDialogOpen = false;
  selectedClient: ClientDTO | null = null;
  isInfoDialogOpen: boolean = false;
  getBlockLabel = (row: any) => row.blocked ? 'Unblock' : 'Block';
  getBlockClass = (row: any) => row.blocked ? 'btn-success' : 'btn-danger';
  
  searchUsername: string ='';
  filteredClients: ClientDTO[] = [];

  constructor(private clientService: ClientService) {}
    
  ngOnInit(): void {
    console.log('load')
    this.loadClients();
  }
    
  loadClients() {
    console.log('load');
    this.clientService.getAllClients().subscribe(data => {
      this.clients = data;
      this.filteredClients = [...data];
    });
  }
  
  get pagedEmployee(): ClientDTO[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredClients.slice(start, start + this.pageSize)
  }
  
  
  onSelectClient(c: ClientDTO) {
    console.log(c.image);
    this.selectedClient = {...c};
      }
  
  addEmployeeDialog() {
    this.isDialogOpen = true;
  }
    
  
  onCloseEditDialog() {
  //  this.isEditDialogOpen = false;
    // this.selectedEmployee = null;
  }
  onCloseDialog() {
    this.isDialogOpen = false;
    this.selectedClient = null;
  }
  onBlockClient(c: ClientDTO) {
      if (c.blocked) {
      this.clientService.unblockClient(c.id!!).subscribe(() => {
        c.blocked = false;
  });
    } else {
      this.clientService.blockClient(c.id!!).subscribe(() => {
        c.blocked = true;
      });
  }
}

  onSearch() {
    if(!this.searchUsername.trim()) {
      this.filteredClients = [...this.clients];
      return;
    } 
    const client = this.clients.find(c => c.username.toLowerCase() === this.searchUsername.toLowerCase());

    if(client) {
      this.clientService.getClientById(client.id!).subscribe({
        next: (client) => {
          this.filteredClients = [client];
          this.page = 1;
        },
        error: () => {
          this.filteredClients = [];
        }
      });
    } else {
      this.filteredClients = [];
    }
  }
    
}
