import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { SignUpService } from 'src/app/services/sign-up.service';
import { User } from 'src/app/models/user';
import { CustomValidator } from 'src/app/models/custom-validator';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private signUpService: SignUpService, private authService: AuthService, private router: Router) { }

  ngOnInit()
  {
    this.registerForm = new FormGroup({
      'email': new FormControl('',
      [Validators.required, Validators.email],
      [CustomValidator.emailRepeatValidator(this.signUpService)]),

      'pass': new FormControl('',
      [Validators.required, Validators.maxLength(15)]),

      'passConfirm': new FormControl('',
      [Validators.required, Validators.maxLength(15)])

    }, { validators: CustomValidator.passwordConfirmValidator() } );
  }

  onSubmit()
  {
    let user = new User();

    user.email = this.email.value;
    user.password = this.pass.value;

    this.signUpService.register(user)
      .subscribe(
        response => {
          Swal.fire({
            title : 'Usuario Creado Exitosamente!',
            text: 'Bienvenido!',
            type: 'success'
          });
          
          // this.login(user);
        },
        error => {
          Swal.fire({
            title: 'Oops!... Hubo un problema al registrarse',
            text: 'Error: ' + error.status + ', ' + error.statusText,
            type: 'warning'
          });
        }
      );

  }

  login(user: User): void
  {
    this.authService.login(user)
      .subscribe(
        response => {
          if(this.authService.isLogged()){
            let redirect = this.authService.redirectUrl
            ? this.router.parseUrl(this.authService.redirectUrl) : '/list';

            this.router.navigateByUrl(redirect);
          }
        },
        error => {
          Swal.fire({
            title: 'E-mail y/o contraseña incorrectos',
            text: 'error: ' + error.status + ', ' + error.statusText,
            type: 'warning'
          });
        }
      )
  }

  get email(){ return this.registerForm.get('email'); }
  get pass(){ return this.registerForm.get('pass'); }
  get passConfirm(){ return this.registerForm.get('passConfirm'); }

}
