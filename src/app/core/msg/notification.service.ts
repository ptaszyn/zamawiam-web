import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class NotificationService {
    private notificationSubject = new Subject<Notification>();
    public notifications = this.notificationSubject.asObservable();

    notify(notification: Notification): void {
        this.notificationSubject.next(notification);
    }
}