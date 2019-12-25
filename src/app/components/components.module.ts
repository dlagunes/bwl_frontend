import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CardComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ], exports: [
    CardComponent,
    NavbarComponent,
  ]
})
export class ComponentsModule { }
