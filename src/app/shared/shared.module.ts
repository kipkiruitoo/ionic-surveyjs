import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollbarDirective } from './../directives/scrollbar.directive';
import { ScrollVanishDirective } from '../directives/scroll-vanish.directive';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [ScrollbarDirective, ScrollVanishDirective],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [ScrollbarDirective, ScrollVanishDirective]
})
export class SharedModule { }
