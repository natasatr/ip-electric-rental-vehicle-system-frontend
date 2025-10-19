import { Component, OnInit } from '@angular/core';
import { VehicleRentalInfoDTO } from '../../../model/VehicleRentalDTO';
import { RentalService } from '../../../services/rentals/rental.service';

@Component({
  selector: 'app-rents',
  templateUrl: './rents.component.html',
  styleUrl: './rents.component.css'
})
export class RentsComponent implements OnInit {

  rentals: VehicleRentalInfoDTO[] = [];
  columns: string[] = ['carModel', 'clientName', 'startLocationName', 'endLocationName', 'rentalDateTime'];
  page = 1;
  pageSize = 5;
  filteredRentals: VehicleRentalInfoDTO[] = [];

  constructor(private rentalService: RentalService) {}

  ngOnInit(): void {
    this.loadRentals();
  }

  loadRentals() {
    this.rentalService.getAllRentals().subscribe({
      next: (data) => {
        this.rentals = data;
        this.filteredRentals = [...data];
      },
      error: (err) => {
        console.error('Error loading rentals', err);
      }
    });
  }

  get pagedRentals(): VehicleRentalInfoDTO[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredRentals.slice(start, start + this.pageSize);
  }

}
