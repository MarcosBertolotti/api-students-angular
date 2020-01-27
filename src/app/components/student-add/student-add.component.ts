import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { StudentAsyncService } from 'src/app/services/student-async.service';
import { CareerService } from 'src/app/services/career.service';
import { Career } from 'src/app/models/career';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/models/custom-validator';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})

export class StudentAddComponent implements OnInit {

  student: Student = new Student();
  studentForm: FormGroup;
  careerList = new Array<Career>();

  constructor(private studentService: StudentAsyncService, private careerService: CareerService) { }

  ngOnInit(): void
  {
    this.careerService.getAll()
      .subscribe(
        response => {
          this.careerList = response;
        },
        error =>{
          console.log(error);
        }
      );

    this.studentForm = new FormGroup({

      'firstName': new FormControl(this.student.firstName,
        [Validators.required, Validators.maxLength(20)]),

      'lastName': new FormControl(this.student.lastName,
        [Validators.required, Validators.maxLength(20)]),

      'dni': new FormControl(this.student.dni,
        [Validators.required, Validators.min(0)],
        [CustomValidator.studentDniRepeatValidator(this.studentService)]),

      'email': new FormControl(this.student.email,
        [Validators.required, Validators.email],
        [CustomValidator.studentEmailRepeatValidator(this.studentService)]),

      'address': new FormControl(this.student.address),

      'careerId': new FormControl(1,
        [Validators.required])

      });
  }

  onSubmit()
  {
    this.student.firstName = this.firstName.value;
    this.student.lastName = this.lastName.value;
    this.student.dni = this.dni.value;
    this.student.email = this.email.value;
    this.student.address = this.address.value;
    this.student.careerId = this.careerId.value;

    this.studentService.add(this.student)
      .subscribe(
        response => {
          Swal.fire({
            title : 'Estudiante agregado exitosamente!',
            type: 'success'
          });
        },
        error =>{
          Swal.fire({
            title: 'Oops!...',
            text: 'Hubo un problema al agregar al estudiante, error: ' + error.status,
            type: 'warning'    
          });
        }
      );
  }

  get firstName(){ return this.studentForm.get('firstName'); }
  get lastName(){ return this.studentForm.get('lastName'); }
  get dni(){ return this.studentForm.get('dni'); }
  get email(){ return this.studentForm.get('email'); }
  get address(){ return this.studentForm.get('address'); }
  get careerId(){ return this.studentForm.get('careerId'); }

  /*
    validateAllFormFields(formGroup: FormGroup) {  
    Object.keys(formGroup.controls).forEach(field => { 
      
      const control = formGroup.get(field);      

      if (control instanceof FormControl)           
        control.markAsTouched({ onlySelf: true });
      else if (control instanceof FormGroup)   
        this.validateAllFormFields(control);                
    });
  }
  */
}
