import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { EmoloyeeModel } from './employee-dashboard.model';
import { ApiService } from '../shared/api.service';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  employeeModelObject: EmoloyeeModel = new EmoloyeeModel()
  formValue !: FormGroup;
  employeeDetails: any
  constructor(private formbuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobileNo: [''],
      salary: [''],
    })
    this.getAllEmployee()
  }

  postEmployeeDetails() {
    this.employeeModelObject.firstName = this.formValue.value.firstName
    this.employeeModelObject.lastName = this.formValue.value.lastName
    this.employeeModelObject.mobileNo = this.formValue.value.mobileNo
    this.employeeModelObject.email = this.formValue.value.email
    this.employeeModelObject.salary = this.formValue.value.salary

    this.api.postEmploye(this.employeeModelObject).subscribe(res => {
      console.log(res)
      alert('Employee added successfully')
      this.formValue.reset()
      let ref = document.getElementById('cancel')
      ref?.click()
      this.getAllEmployee()
    },
      err => {
        alert('Something went wrong')
      })
  }

  getAllEmployee() {
    this.api.getEmploye().subscribe(res => {
      this.employeeDetails = res
    })
  }

  deleteEmployee(data: any) {
    this.api.deleteEmploye(data.id).subscribe(res => {
      alert('Employee deleted successfully')
      this.getAllEmployee()
    })
  }

  onEdit(data: any) {
    this.employeeDetails.id = data.id
    this.formValue.controls['firstName'].setValue(data.firstName)
    this.formValue.controls['lastName'].setValue(data.lastName)
    this.formValue.controls['email'].setValue(data.email)
    this.formValue.controls['mobileNo'].setValue(data.mobileNo)
    this.formValue.controls['salary'].setValue(data.salary)
  }

  updateEmployee() {
    this.employeeModelObject.firstName = this.formValue.value.firstName
    this.employeeModelObject.lastName = this.formValue.value.lastName
    this.employeeModelObject.mobileNo = this.formValue.value.mobileNo
    this.employeeModelObject.email = this.formValue.value.email
    this.employeeModelObject.salary = this.formValue.value.salary
    this.api.updateEmploye(this.employeeModelObject, this.employeeDetails.id).subscribe(res => {
      alert('Employee updated successfully');
      this.formValue.reset();
      let ref = document.getElementById('cancel');
      ref?.click();
      this.getAllEmployee();
    });
  }
}



