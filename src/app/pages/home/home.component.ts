import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/apiService/api.service';
import { ModalService } from './../../components/_modal/modal.service';
import { AuthService } from '../../core/auth-service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  sm = 0;
  cm = 0;
  ratio = 0;
  unSus;
  adns: any = [];
  textoBuscar: string;
  constructor(
    private api: ApiService,
    private modalService: ModalService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    const unsus = this.api.getAdns().subscribe((res: any) => {
      if (res.ok) {
        this.adns = res.adns;
        this.adns.forEach(element => {
          element.type = this.hasMutation(element.adn).toString();
        });
        console.log('this.adns :', this.adns);
      }
      unsus.unsubscribe();
    });
  }

  callBack(a: number) {
    if (a === 2) {
      this.unSus = this.api.getStats().subscribe((response: any) => {
        this.sm = response.count_no_mutation;
        this.cm = response.count_mutations;
        this.ratio = response.ratio;
      });
    } else if (a === 1) {
      this.openModal('newHuman');
    } else if (a === 3) {
      if (this.textoBuscar !== undefined && this.textoBuscar === 'true') {
        this.textoBuscar = '';
      } else {
        this.textoBuscar = 'true';
      }
    } else if (a === 4) {
      if (this.textoBuscar !== undefined && this.textoBuscar === 'false') {
        this.textoBuscar = '';
      } else {
        this.textoBuscar = 'false';
      }
    } else if (a === 5) {
      this.authService.SignOut();
    } else {
      Swal.fire('Opción invalida.');
      // console.log('No se :');
    }
  }

  ngOnDestroy() {
    if (this.sm) {
      this.unSus.unsubscribe();
    }
  }

  makeid(length: number) {
    let result = '';
    const characters = 'ATCG';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  hasMutation(adn: string) {
    let arrayH: any = [];
    const arrayV: any = [];
    let auxBool = false;
    let returnBool = false;
    let num = 0;
    while (auxBool !== true) {
      if ((num * num) === adn.length) {
        auxBool = true;
      } else {
        auxBool = false;
        num++;
      }
    }
    // tslint: disable - next - line: prefer -for-of
    for (let i = 0, e = 0, aux = 0; aux < adn.length; e++ , aux++) {
      if (e === (num - 1) && aux < num) {
        arrayH.push(adn[aux]);
        arrayV.push(arrayH);
        arrayH = [];
        e = 0;
        i++;
      } else if (e === num) {
        arrayH.push(adn[aux]);
        arrayV.push(arrayH);
        arrayH = [];
        e = 0;
        i++;
      } else {
        arrayH.push(adn[aux]);
      }
    }
    if (
      this.horizontal(adn)
      || this.oblicuaD(arrayV, num)
      || this.oblicuaI(arrayV, num)
    ) {
      // console.log(' mutante:', true);
      returnBool = true;
    } else {
      // console.log(' mutante:', false);
      returnBool = false;
    }
    return returnBool;
  }

  horizontal(array: string) {
    let hbool: boolean;
    let e = 0;
    let i = 1;
    let word = '';
    while (i !== array.length) {
      if (word.length > 3) {
        hbool = true;
        i = array.length;
        // console.log(`word: ${word}`);
      } else if (word.length < 4) {
        if (array[e] === array[i]) {
          word += array[e];
        } else {
          word = array[i];
        }
        i++;
        e++;
      }
    }
    return hbool;
  }

  oblicuaI(array, num) {
    let hbool = false;
    let terminar = false;
    let word = '';
    let proceso = 0;
    let i = 5;
    let e = 0;
    let process = '';
    while (terminar !== true) {
      if (proceso === 5) {
        if (process[i - 1] === process[i]) {
          word += process[i];
          i++;
        } else {
          word = process[i];
        }
        if (word.length > 3) {
          hbool = true;
          terminar = true;
        } else {
          hbool = false;
          terminar = true;
        }
      } else if (proceso === 0) {
        if (i >= 0 || e < num) {
          process += array[e][i];
          i--;
          e++;
        } else {
          proceso = 1;
          i = num - 1;
          e = 1;
        }
      } else if (proceso === 1) {
        if (i < 0 || e < num) {
          process += array[e][i];
          i--;
          e++;
        } else {
          proceso = 2;
          i = 5;
          e = 2;
        }
      } else if (proceso === 2) {
        if (i < 0 || e < num) {
          process += array[e][i];
          i--;
          e++;
        } else {
          proceso = 3;
          i = 4;
          e = 0;
        }
      } else if (proceso === 3) {
        if (e < num - 1) {
          process += array[e][i];
          i--;
          e++;
        } else {
          proceso = 4;
          i = 3;
          e = 0;
        }
      } else if (proceso === 4) {
        if (e < num && i > -1) {
          process += array[e][i];
          i--;
          e++;
        } else {
          proceso = 5;
          e = 0;
          i = 0;
          // console.log('process :', process, process.length);
        }
      }
    }
    return hbool;
  }

  oblicuaD(array, num) {
    let terminar = false;
    let hbool = false;
    let proceso = 0;
    let i = num - 1;
    let e = num - 1;
    let process = '';
    let word = '';
    while (terminar !== true) {
      if (proceso === 5) {
        if (process[i - 1] === process[i]) {
          word += process[i];
          i++;
        } else {
          word = process[i];
        }
        if (word.length > 3) {
          hbool = true;
          terminar = true;
        } else {
          hbool = false;
          terminar = true;
        }
      } else if (proceso === 0) {
        if (i >= 0 || e >= 0) {
          process += array[e][i];
          i--;
          e--;
        } else {
          proceso = 1;
          i = num - 2;
          e = num - 1;
        }
      } else if (proceso === 1) {
        if (i >= 0 && e >= 0) {
          process += array[e][i];
          i--;
          e--;
        } else {
          proceso = 2;
          i = num - 3;
          e = num - 1;
        }
      } else if (proceso === 2) {
        if (i >= 0 && e >= 0) {
          process += array[e][i];
          i--;
          e--;
        } else {
          proceso = 3;
          i = num - 1;
          e = num - 2;
        }
      } else if (proceso === 3) {
        if (i >= 0 && e >= 0) {
          process += array[e][i];
          i--;
          e--;
        } else {
          proceso = 4;
          i = num - 1;
          e = num - 3;
        }
      } else if (proceso === 4) {
        if (i > -1 && e >= 0) {
          process += array[e][i];
          i--;
          e--;
        } else {
          proceso = 5;
          e = 0;
          i = 0;
          // console.log('process :', process, process.length);
        }
      }
    }
    return hbool;
  }
}
