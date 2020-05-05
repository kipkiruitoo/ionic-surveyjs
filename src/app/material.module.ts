import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatTableModule,
  MatStepperModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatIconModule,
  MatPaginatorModule,
  MatSortModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    MatTableModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class MaterialModule {}
