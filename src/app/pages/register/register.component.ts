import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { NavigationService } from '../../services/navigation.service';

// Custom validator to check if passwords match
export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      }, { validators: passwordMatchValidator }),
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  handleSubmit() {
    if (this.registerForm.valid) {
      // Destructure to exclude passwordGroup and acceptTerms for the final payload
      const { firstName, lastName, email, passwordGroup } = this.registerForm.value;
      const finalForm = {
        firstName,
        lastName,
        email,
        password: passwordGroup.password
      };
      console.log('Register attempt:', finalForm);
      this.navigationService.navigate('/dashboard');
    }
  }

  navigate(path: string) {
    this.navigationService.navigate(path);
  }
}
