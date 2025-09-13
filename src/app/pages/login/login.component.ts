import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  handleSubmit() {
    if (this.loginForm.valid) {
      console.log('Login attempt:', this.loginForm.value);
      // Here you would typically call an authentication service
      this.navigationService.navigate('/dashboard');
    }
  }

  navigate(path: string) {
    this.navigationService.navigate(path);
  }
}
