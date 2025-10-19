import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptor/auth.interceptor';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { ManagerComponent } from './components/manager/manager.component';
import { OperatorComponent } from './components/operator/operator.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { AdminCardComponent } from './components/reusable/admin-card/admin-card.component';
import { VehiclesComponent } from './components/admin/pages/vehicles/vehicles.component';
import { ManufacturerComponent } from './components/admin/pages/manufacturer/manufacturer.component';
import { EmployeesComponent } from './components/admin/pages/employees/employees.component';
import { TableComponent } from './components/reusable/table/table.component';
import { CarsComponent } from './components/admin/pages/vehicles/cars/cars.component';
import { AddVehicleDialogComponent } from './components/reusable/add-vehicle-dialog/add-vehicle-dialog.component';
import { DetailsVehicleComponent } from './components/reusable/details-vehicle/details-vehicle.component';
import { MalfunctionComponent } from './components/admin/pages/vehicles/malfunction/malfunction.component';
import { EditManufacturerDialogComponent } from './components/admin/pages/manufacturer/edit-manufacturer-dialog/edit-manufacturer-dialog.component';
import { BicycleComponent } from './components/admin/pages/vehicles/bicycle/bicycle.component';
import { ScooterComponent } from './components/admin/pages/vehicles/scooter/scooter.component';
import { UsersComponent } from './components/admin/pages/users/users.component';
import { EditUserDialogComponent } from './components/reusable/edit-user-dialog/edit-user-dialog.component';
import { MalfunctionDialogComponent } from './components/operator/malfunction-dialog/malfunction-dialog.component';
import { ClientsComponent } from './components/admin/pages/clients/clients.component';
import { ClientDetailsComponent } from './components/admin/pages/clients/client-details/client-details.component';
import { CsvImportComponent } from './components/reusable/csv-import/csv-import.component';
import { RentsComponent } from './components/operator/rents/rents.component';
import { MessageDialogComponent } from './components/reusable/message-dialog/message-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    ManagerComponent,
    OperatorComponent,
    HeaderComponent,
    FooterComponent,
    AdminCardComponent,
    VehiclesComponent,
    ManufacturerComponent,
    EmployeesComponent,
    TableComponent,
    CarsComponent,
    AddVehicleDialogComponent,
    DetailsVehicleComponent,
    MalfunctionComponent,
    EditManufacturerDialogComponent,
    BicycleComponent,
    ScooterComponent,
    UsersComponent,
    EditUserDialogComponent,
    MalfunctionDialogComponent,
    ClientsComponent,
    ClientDetailsComponent,
    CsvImportComponent,
    RentsComponent,
    MessageDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
