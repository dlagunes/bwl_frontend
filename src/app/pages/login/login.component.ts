import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../core/auth-service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validationsForm: FormGroup;
  errorMessage = '';

  myForm = {
    name: '',
    psw: ''
  };
  validationMessages = {
    name: [
      { type: 'required', message: 'El campo es obligatorio.' },
    ],
    psw: [
      { type: 'pattern', message: 'Simbolo no admitido.' },
      { type: 'required', message: 'Contraseña obligatoria.' },
      { type: 'minlength', message: 'La contraseña debe ser mayor a 5 carácteres.' }
    ]
  };
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.validationsForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      psw: new FormControl('', Validators.compose([
        Validators.pattern('^[a-zA-Z0-9_.+-]+$'),
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  login(a) {
    this.authService.login(a.name, a.psw).subscribe((res: any) => {});
  }
}
