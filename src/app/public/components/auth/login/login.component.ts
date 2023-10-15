import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@app/core/services/auth.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsersService } from '@app/core/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private isValidEmail =  /\S+@\S+\.\S+/;
  private subscriptions :  Subscription = new Subscription();
  public imageData: any;

  hide = true;
  loginForm: any = FormGroup;
  submitted: any = false;
  auth2: any;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private authSvc: AuthService, 
    private fb: UntypedFormBuilder, 
    private UsersSrv: UsersService,
    ) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.getTokens();

    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required]],
      clave: ['',[Validators.required, Validators.minLength(6)]]
    });

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }



  onLogin(): void {
    const formValue = this.loginForm.value;

    this.spinner.show();
    setTimeout(() => {
      this.authSvc.login(formValue)
      .subscribe((res: any) => {
        if(res){     
            this.spinner.hide();
            this.router.navigate(['/dashboard'])
            .then(() => {
              setTimeout(() =>{
                let currentUrl = this.router.url;
                this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                this.router.onSameUrlNavigation = 'reload';
                this.router.navigate([currentUrl]);
              }, 100); 
            })
        }
      },
      (err: any) => {
        console.log(err);
      })
    }, 3500)

  }

  isRequired(){
    return false;
  }

  getErrorMessage(field: string){
    let message;
    if(this.loginForm.get(field)?.hasError('pattern')){
      message = 'email no valido';
    }else if(this.loginForm.get(field)?.hasError('minlength')){
      const minlength = this.loginForm.get(field)?.errors?.['minlength'].requiredLength;
      message = `agrege una contraseña de mas de  ${minlength} caracteres`
    }
    return message;
   }

  isValidField(field: string){
    return(
      (this.loginForm.get(field) || this.loginForm.get(field)?.dirty) && !this.loginForm.get(field)?.valid
    );
  }

  get position() { return this.loginForm.controls}

  onSubmit() {
    this.submitted = true;
    if(this.submitted && this.position['email']?.errors){
    }if (this.submitted && this.position['password']?.errors) {
    }
  }

  getUserInfo() {
    const token = this.getTokens();
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      return JSON.parse(payload)['uid'];
    } else {
      return null;
    }
  }
  
  getTokens() {
    return localStorage.getItem("login-token");
  }

  uid: any = this.getUserInfo();

}
