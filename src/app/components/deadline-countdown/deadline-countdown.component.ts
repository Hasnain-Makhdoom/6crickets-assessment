import { Component, effect, signal } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { DeadlineService } from '../../shared/services/deadline.service';

@Component({
  selector: 'app-deadline-countdown',
  standalone: true,
  imports: [],
  templateUrl: './deadline-countdown.component.html',
  styleUrl: './deadline-countdown.component.scss'
})
export class DeadlineCountdownComponent {
  secondsLeft = signal<number>(0); // Signal to hold the countdown value
  errorSignal = signal<string | null>(null); //signal for displaying error
  private countdownSubscription: Subscription | undefined;

  constructor(private deadlineService: DeadlineService) {}

  ngOnInit(): void {
    this.deadlineService.getDeadline().subscribe({
      next: response => {
        this.secondsLeft.set(response.secondsLeft); // Initialize the signal with the API response
        this.startCountdown();
      },
      error: err => {
        this.errorSignal.set(err.message || 'Unknown error');
      }
    });
  }

  private startCountdown(): void {
    this.countdownSubscription = interval(1000).subscribe(() => {
      const currentSeconds = this.secondsLeft();
      if (currentSeconds > 0) {
        this.secondsLeft.update(value => value - 1); // Updating the signal value
      } else {
        this.stopCountdown();
      }
    });
  }

  private stopCountdown(): void {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    //adding an extra layer of check so that if the user navigates away before the countdown is stoped then we make sure it is unsubscribed to avoid any memory leakage
    this.stopCountdown();
  }
}
