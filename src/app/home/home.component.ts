import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { setLastSeenTime } from '../states/time/time.action';
import { AppState } from '../states/app.state';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { TimezoneEditorComponent } from "./timezone-editor/timezone-editor.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TimezoneEditorComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  private local_time$: Observable<Date>;
  private timeSubscription: Subscription | null = null;

  public time!: string;
  public subscribeState: boolean;

  timezoneCheckboxForm: any;

  constructor(private store: Store<AppState>) {
    // Initialize observable time stream
    this.local_time$ = new Observable<Date>((observer) => {
      setInterval(() => observer.next(new Date()), 1000);
    });

    // Initialize the subscription state and time
    this.subscribeState = false;

    // TODO: Unsubscribe
    this.store.select('time').subscribe(
      time => { this.time = time.lastSeenTime }
    );

    this.timezoneCheckboxForm = new timezoneCheckboxes();

  }

  subscribe(): void {
    this.subscribeState = !this.subscribeState;

    console.log('Last seen time detected: ' + this.store.select('time').subscribe(time => time.lastSeenTime));

    if (this.subscribeState) {
      console.log('[Debug] Subscribed');
      this.timeSubscription = this.local_time$.subscribe({
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
        this.store.dispatch(setLastSeenTime({ lastSeenTime: this.time }));
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

export class timezoneCheckboxes {
  // Timezone Checkboxes - Currently hardcoded - todo, load from a service and add with a loop 
  // for each timezone (including the newly added ones)
  timezoneCheckboxForm = new FormGroup({
    UK: new FormControl(''),
    US: new FormControl(''),
  });
}




