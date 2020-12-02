import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MyPaginationComponent } from './my-pagination.component';



@NgModule({
  declarations: [MyPaginationComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MyPaginationComponent,
    RouterModule
  ]
})
export class MyLibModule { }
