import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  private time$: Observable<Date>;
  private timeSubscription: Subscription | null = null;;
  public time: string;
  public subscribeState: boolean;

  constructor() {
    // Initialize observable time stream
    this.time$ = new Observable<Date>((observer) => {
      setInterval(() => observer.next(new Date()), 1000);
    });

    // Initialize the subscription state and time
    this.subscribeState = false;
    this.time = '//UNKNOWN//';
  }

  subscribe(): void {
    this.subscribeState = !this.subscribeState;

    if (this.subscribeState) {
      console.log('[Debug] Subscribed');
      this.timeSubscription = this.time$.subscribe({
        next: (val) => {
          this.time = val.toLocaleTimeString();
        },
        error(err) {
          console.error('An error occurred: ' + err);
        }
      });
    } 
    else {
      if (this.timeSubscription) {
        this.timeSubscription.unsubscribe();
      }
      console.log('[Debug] Unsubscribed');
    }
  }

  ngOnInit(): void {
    // Any initialization logic
  }

  ngOnDestroy(): void {
    // Clean up the subscription when the component is destroyed
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe();
    }
  }
}




