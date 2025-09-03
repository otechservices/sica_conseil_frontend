import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TrainingComponent } from './components/training/training.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TrainingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-app';
}
