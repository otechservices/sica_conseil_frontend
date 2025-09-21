import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-header',

  templateUrl: './auth-header.component.html',
  styleUrl: './auth-header.component.css'
})
export class AuthHeaderComponent {
@Input() title=""
@Input() subtitle=""
}
