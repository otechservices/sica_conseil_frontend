import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { NavigationService } from '../../../../core/services/navigation.service';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import path from 'path';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';

// Custom validator to check if passwords match
export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const password_confirmation = control.get('password_confirmation')?.value;
  return password === password_confirmation ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  showPassword = false;
  showConfirmPassword = false;
  title="Inscription"
subtitle=""

  constructor(
    private fb: FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      userType: ['', Validators.required],
      moraleType: [''],
      physiqueType: [''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  handleSubmit() {
    if (this.registerForm.valid) {


        this.authService.register(this.registerForm.value).subscribe((res:any)=>{
    
            this.toastrService.success(res.message)


            window.open(res.data,'_blank')
            

          //  this.navigationService.navigate('/customer/dashboard');
    
        },
        (err:any)=>{
    
          console.log(err)
            AppSweetAlert.simpleAlert("error","Inscription",err.error.message)
        })
      
      }
    
  }

  navigate(path: string) {
    this.navigationService.navigate(path);
  }
}
