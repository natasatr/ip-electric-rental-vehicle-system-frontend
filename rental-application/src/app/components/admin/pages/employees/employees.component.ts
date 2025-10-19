import { Component } from '@angular/core';
import { EmployeeDTO } from '../../../../model/EmployeeDTO';
import { EmployeeService } from '../../../../services/employee/employee.service';
import { Role } from '../../../../enums/Role';
import { EmployeeRegisterDTO } from '../../../../model/EmployeeRegisterDTO';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {

  employees: EmployeeDTO[] = [];
  columns: string[] = ['firstName', 'lastName', 'username','role'];
  page = 1;
  pageSize = 5;
  isDialogOpen = false;
  selectedEmployee: EmployeeDTO | null = null;
  isEditDialogOpen = false;
  roles: string[] = [];

  searchUsername: string = '';
  filteredEmployee: EmployeeDTO[] = [];
  
  employeeFields: any[] = []; 

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.roles = Object.values(Role);


    this.employeeFields = [
      { key: 'firstName', label: 'Name', type: 'text' },
      { key: 'lastName', label: 'Last name', type: 'text' },
      { key: 'username', label: 'Username', type: 'text' },
      { key: 'email', label: 'Email', type: 'text' },
      { key: 'password', label: 'Password', type: 'password' },
      { key: 'password1', label: 'Repeat password', type: 'password' },
      { key: 'role', label: 'Role', type: 'select', options: this.roles }
    ];

    this.loadEmployees();
  }
  
  loadEmployees() {
    this.employeeService.getAllEmployees().subscribe(data => {
      this.employees = data;
      this.filteredEmployee = [...data]; 
    });
  }

  get pagedEmployee(): EmployeeDTO[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredEmployee.slice(start, start + this.pageSize);
  }

  onDelete(emp: EmployeeDTO) {
    if (confirm("Are you sure? ")) {
      this.employeeService.deleteEmployee(emp.id!).subscribe({
        next: () => {
          this.employees = this.employees.filter(c => c.id !== emp.id);
          this.filteredEmployee = this.filteredEmployee.filter(c => c.id !== emp.id);
          alert('Employee deleted!');
        },
        error: (error) => {
          console.error('Error during deleting employee', error);
          alert('ERROR');
        }
      });
    }
  }

  onSelectEmployee(emp: EmployeeDTO) {
    this.selectedEmployee = { ...emp };
    this.isEditDialogOpen = true;
  }

  addEmployeeDialog() {
    this.isDialogOpen = true;
  }

  onSaveEmployee(data: any) {
    const exists = this.employees.some(e => e.username.toLowerCase() === data.username.toLowerCase());
      if (exists) {
        alert(`User with username "${data.username}" already exists!`);
        return;
      }
    const emp: EmployeeRegisterDTO = {
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      password: data.password,
      email: data.email,
      role: data.role
    };
    this.employeeService.createNewEmployee(emp).subscribe({
      next: (created) => {
        this.employees = [...this.employees, created];
        this.filteredEmployee = [...this.employees];
        this.isDialogOpen = false;
        alert('Employee added successfully!');
      },
      error: (err) => {
        console.error('Error creating employee', err);
        alert('Error while creating employee');
      }
    });
  }

  onCloseEditDialog() {
    this.isEditDialogOpen = false;
    this.selectedEmployee = null;
  }

  onCloseDialog() {
    this.isDialogOpen = false;
  }

  onUpdateEmployee() {
    if (this.selectedEmployee && this.selectedEmployee.id) {
      this.employeeService.updateEmployee(this.selectedEmployee).subscribe({
        next: (updateEmp) => {
          this.employees = this.employees.map(m => 
            m.id === updateEmp.id ? updateEmp : m
          );
          this.filteredEmployee = [...this.employees]; 
          this.isEditDialogOpen = false;
          this.selectedEmployee = null;
          alert('Employee updated successfully!');
        },
        error: (err) => {
          console.error('Error during update', err);
        }
      });
    }
  }

  onSearch() {
    if (!this.searchUsername.trim()) {
      this.filteredEmployee = [...this.employees];
      return;
    }

    const emp = this.employees.find(c => c.username.toLowerCase() === this.searchUsername.toLowerCase());
    if (emp) {
      this.employeeService.getEmployeeById(emp.id!).subscribe({
        next: (emp) => {
          this.filteredEmployee = [emp];
          this.page = 1;
        },
        error: () => {
          this.filteredEmployee = [];
        }
      });
    } else {
      this.filteredEmployee = [];
    }
  }
}
