import { NgModule } from '@angular/core';
import { DataService } from './services.index';
import { ApiService } from './apiService/api.service';

@NgModule({
  declarations: [
  ],
  providers: [
    DataService,
    ApiService
  ],
  imports: [
  ],
  exports: [
  ]
})
export class ServicesModule { }
