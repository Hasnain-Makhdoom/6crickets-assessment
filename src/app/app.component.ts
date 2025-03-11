import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeadlineCountdownComponent } from "./components/deadline-countdown/deadline-countdown.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DeadlineCountdownComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = '6crickets-assessment';
}
