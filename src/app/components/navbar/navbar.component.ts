import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() response: any = new EventEmitter ();
  @Input() sm: number = 0;
  @Input() cm: number = 0;
  @Input() ratio: number = 0;
  tipo: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  onClick(a: number) {
    this.response.emit(a);
    if (a === 2) {
      // console.log('2 :', 2);
      this.tipo = true;
    } else if (a === 1) {
      // console.log('1 :', 1);
      this.tipo = false;
    } else if (a === 3) {
      // console.log('3 :', 3);
      this.tipo = false;
    } else if (a === 4) {
      this.tipo = false;
      // console.log('4 :', 4);
    } else if (a === 5) {
      // console.log('5 :', 5);
      this.tipo = false;
    } else {
      // console.log('No se :');
      this.tipo = false;
    }
  }

}
