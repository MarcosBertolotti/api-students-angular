import { Component, OnInit } from '@angular/core';
import { StudentAsyncService } from 'src/app/services/student-async.service';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/models/student';
import { CareerService } from 'src/app/services/career.service';
import { Career } from 'src/app/models/career';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.css']
})
export class StudentUpdateComponent implements OnInit {

  student: Student = new Student();
  studentForm: FormGroup;
  careerList = new Array<Career>();

  constructor(private studentService: StudentAsyncService, private careerService: CareerService, private route: ActivatedRoute) { }

  ngOnInit()
  { 
    let studentId = Number(this.route.snapshot.paramMap.get('id'));

    this.studentService.getById(studentId)
      .subscribe(
        response => {
          this.student = response;
          this.setValuesStudentForm();
        },
        error => {
          console.log(error);
        }
      );
    
    this.careerService.getAll()
      .subscribe(
        response => {
          this.careerList = response;
        },
        error => {
          console.log(error);
        }
      );

    this.studentForm = new FormGroup({

      'firstName': new FormControl(this.student.firstName,
        [Validators.required, Validators.maxLength(20)]),

      'lastName': new FormControl(this.student.lastName,
        [Validators.required, Validators.maxLength(20)]),

      'dni': new FormControl(this.student.dni,
        [Validators.required, Validators.min(0)]),

      'email': new FormControl(this.student.email,
        [Validators.required, Validators.email]),
      
      'address': new FormControl(this.student.address),

      'careerId': new FormControl(this.student.careerId,
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

    this.studentService.update(this.student)
      .subscribe(
        response => {
          Swal.fire({
            title : 'Estudiante actualizado exitosamente!',
            type: 'success'
          });
        },
        error => {
          Swal.fire({
            title: 'Oops!...',
            text: 'Hubo un problema al actualizar el estudiante, Error: ' + error.status,
            type: 'warning'
          });
        }
      );
  }

  setValuesStudentForm(): void
  {
    this.studentForm.setValue({
      'firstName': this.student.firstName,
      'lastName': this.student.lastName,
      'dni': this.student.dni,
      'email': this.student.email,
      'address': this.student.address,
      'careerId': this.student.careerId
    });
  }

  get firstName() { return this.studentForm.get('firstName') }
  get lastName() { return this.studentForm.get('lastName') }
  get dni() { return this.studentForm.get('dni') }
  get email() { return this.studentForm.get('email') }
  get address() { return this.studentForm.get('address') }
  get careerId() { return this.studentForm.get('careerId') }

}
