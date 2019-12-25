import { Component } from '@angular/core';
import { ModalService } from './components/_modal/modal.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from './core/auth-service/auth.service';
import { ApiService } from './services/apiService/api.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'proyectoBWL';
  validationsForm: FormGroup;
  errorMessage = '';

  myForm = {
    name: '',
  };
  validationMessages = {
    name: [
      { type: 'required', message: 'El campo es obligatorio.' },
    ],
  };
  constructor(
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private apiService: ApiService,
    private datePipe: DatePipe,
  ) {
    this.validationsForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });
  }

  createHuman(a) {
    const date = this.datePipe.transform(new Date(), 'yyyy/MM/dd');
    const usus = this.apiService.getAdn().subscribe((res: any) => {
      if (res.ok) {
        const data: {date: string, name: string, adn: string } = {adn: res.adn, date, name: a.name };
        this.apiService.addAdn(data).subscribe((result: any) => {
          if (result.ok) {
            location.reload();
          }
        });
      } else {
        Swal.fire(res.mensaje);
      }
      usus.unsubscribe();
    });
    this.closeModal('newHuman');
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
}
