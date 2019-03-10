import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";

import { TokenStorageService } from './services/token-storage.service';
import { NotificationService } from '../../msg/notification.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    public static HTTP_ERROR_RESPONSE = 'HttpErrorResponse';

    constructor(private token: TokenStorageService, private notify: NotificationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        const token = this.token.getToken();
        if (token != null) {
            authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
        }
        //return next.handle(authReq);
        return next.handle(authReq).pipe(tap((event: HttpEvent<any>) => { }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status == 401) {
                    this.notify.notify(new Notification("Operacja wymaga logowania")); 
                } else { this.notify.notify(new Notification(err.message)); }
            }
        }));
    }
}

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
