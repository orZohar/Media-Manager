
/**
 * A service to boradcast, subscribe and unsubscribe to events in the app
 */
interface Event {
  key: string;
  value: any;
}

import { Injectable } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  protected _eventsSubject = new Subject<Event>();

  constructor() { }

  public BroadcastEvent(key: string, value: any) {
    this._eventsSubject.next({ key, value })
  }

  private GetEvent(key: string): Observable<any> {
    return this._eventsSubject.asObservable()
      .pipe(
        filter(e => e.key === key),
        map(e => e.value)
      );
  }

  public on(key: string, callback: (event: Event) => any): Subscription {
    return this.GetEvent(key).subscribe(callback);
  }

  public unsubscribe(subscription: Subscription) {
    subscription.unsubscribe();
  }

  // Subscribe to multiple events
  public onMany(subscription: Subscription, keys: string[], callback: (event: Event) => any): Subscription {
    if (!subscription) {
      subscription = new Subscription();
    }

    keys.forEach(key => {
      subscription.add(this.GetEvent(key).subscribe(callback));
    });

    return subscription;
  }

}
