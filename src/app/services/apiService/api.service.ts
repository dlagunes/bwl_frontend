import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  urlBase = 'https://us-central1-bwl-proyecto.cloudfunctions.net/api/';
  // urlBase = 'http://localhost:5000/bwl-proyecto/us-central1/api/';
  constructor(
    private http: HttpClient,
  ) { }
    getStats() {
      return this.http.get(this.urlBase + 'stats').pipe(catchError(err => {
        Swal.fire(err.error.mensaje);
        return of(err.error);
      }));
    }

    getAdn() {
      return this.http.get(this.urlBase + 'adn').pipe(catchError(err => {
        Swal.fire(err.error.mensaje);
        return of(err.error);
      }));
    }

    getAdns() {
      return this.http.get(this.urlBase + 'adns').pipe(catchError(err => {
        Swal.fire(err.error.mensaje);
        return of(err.error);
      }));
    }

    addAdn( data: {date: string, name: string, adn: string }) {
      const params = new HttpParams()
      .set('name', data.name)
      .set('adn', data.adn)
      .set('date', data.date);
      return this.http.post<any>(this.urlBase + 'adn/', params)
      .pipe(catchError(err => {
        Swal.fire(err.error.mensaje);
        return of(err.error);
      }));
    }
}
