import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { StudentAsyncService } from 'src/app/services/student-async.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  studentList = new Array<Student>();

  constructor(private studentService: StudentAsyncService) { }

  ngOnInit()
  {
    this.studentService.getAll()
      .subscribe(
        response => {
          this.studentList = response;
        },
        error => {
          console.log(error);
        }
      );
  }

  deleteById(studentId: number){
    
    this.studentService.deleteById(studentId)
      .subscribe(
        response => {
          this.deleteByIdOfList(studentId);

          Swal.fire({
            title: 'Estudiante eliminado con exito!',
            type: 'success'
          })
        },
        error => {
          Swal.fire({
            title: 'Oops!...',
            text: 'Hubo un problema al eliminar al estudiante con id: ' + studentId,
            type: 'warning'
          })
        }
      );
  }

  deleteByIdOfList(studentId: number)
  {
   this.studentList = this.studentList.filter(s => s.studentId != studentId);
   /*
   for(let i = 0; i < this.studentList.length; i++){
     if(this.studentList[i].studentId == studentId){
      this.studentList.splice(i,1);
      return;
     }
   }*/
  }



}
