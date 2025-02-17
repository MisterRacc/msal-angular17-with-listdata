import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' // ✅ Makes the service available throughout the app
})
export class AuthService {
  private emailSubject = new BehaviorSubject<string | null>(null);
  email$ = this.emailSubject.asObservable(); // ✅ Expose it as an observable
  
  private userSubject = new BehaviorSubject<any | null>(null);
  user$ = this.userSubject.asObservable(); // ✅ Observable for user object

  private userToken = new BehaviorSubject<string | null>(null);
  token$ = this.userSubject.asObservable(); // ✅ Observable for user object

  setEmail(email: string) {
    this.emailSubject.next(email);
  }

  setUser(user: any) {
    this.userSubject.next(user);
  }

  setToken(token: string) {
    this.userToken.next(token);
  }
}
