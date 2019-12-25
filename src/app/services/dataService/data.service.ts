import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data = {};

  constructor() { }

  guardado() {
    localStorage.setItem('data', JSON.stringify(this.data));
  }

  cargar() {
    if (localStorage.getItem('data')) {
      this.data = JSON.parse(localStorage.getItem('data'));
    }
  }

  setOption(value) {
    this.data = value;
    this.guardado();
  }

  getOption() {
    this.cargar();
    return this.data;
  }
}
