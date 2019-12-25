import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  // config = { apiUrl: 'http://localhost:5000/bwl-proyecto/us-central1/api' };
  config = { apiUrl: 'https://us-central1-bwl-proyecto.cloudfunctions.net/api'};
  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('userBWLbzg0jak1q5n')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username, password) {
    const params = new HttpParams()
      .set('name', username)
      .set('password', password);
    return this.http.post<any>(`${this.config.apiUrl}/loginUser/`, params)
      .pipe(catchError(err => {
        return of(err.error);
      }), pipe(
        map(user => {
          if (user.ok) {
            localStorage.setItem('userBWLbzg0jak1q5n', JSON.stringify(user));
            this.router.navigate(['/inicio']);
            this.currentUserSubject.next(user);
            return user;
          } else {
            Swal.fire(user.mensaje);
            this.router.navigate(['/login']);
            localStorage.setItem('userBWLbzg0jak1q5n', null);
            localStorage.removeItem('userBWLbzg0jak1q5n');
          }
        }))
      );
  }

  async SignOut() {
    localStorage.setItem('userBWLbzg0jak1q5n', null);
    localStorage.removeItem('userBWLbzg0jak1q5n');
    this.router.navigate(['/login']);
    location.reload(true);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('userBWLbzg0jak1q5n'));
    return user !== null;
  }
  get authenticated(): boolean {
    const user = JSON.parse(localStorage.getItem('userBWLbzg0jak1q5n'));
    return user !== null;
  }
  get currentUserObservable(): any {
    const user = JSON.parse(localStorage.getItem('userBWLbzg0jak1q5n'));
    return user;
  }
}
