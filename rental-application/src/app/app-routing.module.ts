import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './guards/auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { ManagerComponent } from './components/manager/manager.component';
import { OperatorComponent } from './components/operator/operator.component';
import { VehiclesComponent } from './components/admin/pages/vehicles/vehicles.component';
import { ManufacturerComponent } from './components/admin/pages/manufacturer/manufacturer.component';
import { EmployeesComponent } from './components/admin/pages/employees/employees.component';
import { CarsComponent } from './components/admin/pages/vehicles/cars/cars.component';
import { BicycleComponent } from './components/admin/pages/vehicles/bicycle/bicycle.component';
import { ScooterComponent } from './components/admin/pages/vehicles/scooter/scooter.component';
import { UsersComponent } from './components/admin/pages/users/users.component';
import { MalfunctionComponent } from './components/admin/pages/vehicles/malfunction/malfunction.component';
import { MalfunctionDialogComponent } from './components/operator/malfunction-dialog/malfunction-dialog.component';
import { ClientsComponent } from './components/admin/pages/clients/clients.component';
import { RentsComponent } from './components/operator/rents/rents.component';

const routes: Routes = [
    {path: 'login', component: LoginComponent}, 
    {path: 'register', component: RegisterComponent},
    {path: 'admin', component: AdminComponent, canActivate: [authGuard]},
    {path: 'manager', component: ManagerComponent, canActivate: [authGuard]}, 
    {path: 'operator', component: OperatorComponent, canActivate: [authGuard]}, 
    {path: 'vehicles', component: VehiclesComponent, canActivate: [authGuard]},
    //  children: [
     //   {path: 'cars', component: CarsComponent},
      //  {path: '', redirectTo: 'cars', pathMatch: 'full'}
     // ]
  //  },
    {path: 'vehicles/cars', component: CarsComponent,canActivate: [authGuard]}, 
    {path: 'vehicles/bicycles', component: BicycleComponent, canActivate: [authGuard]},
    {path: 'vehicles/scooters', component: ScooterComponent, canActivate: [authGuard]},
    {path: 'manufacturer', component: ManufacturerComponent, canActivate: [authGuard]}, 
    {path: 'users', component: UsersComponent, canActivate: [authGuard]},
    {path: 'users/clients', component: ClientsComponent, canActivate: [authGuard]},
    {path: 'users/employees', component: EmployeesComponent, canActivate: [authGuard]}, 
   // {
      //  path: 'users',
      //  component: UsersComponent,
       // canActivate: [authGuard],
       // children: [
        //  { path: 'employees', component: EmployeesComponent },
         // { path: 'clients', component: ClientsComponent },
        //  { path: '', redirectTo: 'employees', pathMatch: 'full' }
     //   ]
   // },
    {path: "malfunctions", component: MalfunctionDialogComponent, canActivate:[authGuard]},
    {path: "rents", component: RentsComponent, canActivate:[authGuard]},
    {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
