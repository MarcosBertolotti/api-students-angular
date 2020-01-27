import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { StudentAsyncService } from 'src/app/services/student-async.service';
import { ActivatedRoute } from '@angular/router';
import { CareerService } from 'src/app/services/career.service';
import { Career } from 'src/app/models/career';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {
  
  student = new Student();
  career = new Career();

  constructor(private studentService: StudentAsyncService, private careerService: CareerService, private route: ActivatedRoute) { }

  ngOnInit()
  {
    let studentId = Number(this.route.snapshot.paramMap.get('id'));

    this.studentService.getById(studentId)
      .subscribe(
        response => {
          this.student = response;
          this.getCareer();
        },
        error => {
          console.log(error);
        }
      );

  }

  getCareer(): void
  {
    this.careerService.getById(this.student.careerId)
      .subscribe(
        response => {
          this.career = response;
        },
        error => {
          console.log(error);
        }
      );
  }

}
