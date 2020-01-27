import { ValidatorFn, AbstractControl, FormGroup, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, interval, of, observable } from 'rxjs';
import { SignUpService } from '../services/sign-up.service';
import { StudentAsyncService } from '../services/student-async.service';
import { map, catchError } from 'rxjs/operators';

export class CustomValidator {

    static emailRepeatValidator(signupService: SignUpService): AsyncValidatorFn{
        return (control: AbstractControl): Observable<{ [key: string]: any } | null > => {
            return signupService.getUserByEmail(control.value)
               .pipe(
                    map(response => {
                        return null;
                    }),
                    catchError(error => {
                        if(error.status == 409)
                            return of({ 'emailExists': true });
                    })                   
                );
        }
    }            

    static studentEmailRepeatValidator(studentService: StudentAsyncService): AsyncValidatorFn{
        return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
            return studentService.getStudentByEmail(control.value)
                .pipe(
                    map(response =>{
                        return null;
                    }),
                    catchError(error => {
                        if(error.status == 409)
                            return of({ 'emailStudentExists': true});
                    })
                );
        }
    }

    static studentDniRepeatValidator(studentService: StudentAsyncService): AsyncValidatorFn{
        return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
            return studentService.getStudentByDni(control.value)
                .pipe(
                    map(response =>{
                        return null;
                    }),
                    catchError(error => {
                        if(error.status == 409)
                            return of({ 'dniStudentExists': true});
                    })
                );
        }
    }

    static passwordConfirmValidator(): ValidatorFn{
        return (control: FormGroup): { [key: string]: any } | null => {
            
            const pass = control.get('pass').value;
            const passConfirm = control.get('passConfirm').value;

            return (pass !== passConfirm) ? { 'passwordConfirm': { value: [pass,passConfirm] } } : null;
        }
    };

}
