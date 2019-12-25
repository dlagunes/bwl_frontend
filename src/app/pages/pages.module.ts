import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PagesRoutesModule } from './pages.routes.module';
import { ComponentsModule } from '../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
  ],
  imports: [
    PagesRoutesModule,
    ComponentsModule,
    PipesModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ],
  exports: [
    LoginComponent,
    HomeComponent,
  ]
})
export class PagesModule { }
