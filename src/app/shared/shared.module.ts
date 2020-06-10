import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollbarDirective } from './../directives/scrollbar.directive';
import { ScrollVanishDirective } from '../directives/scroll-vanish.directive';

@NgModule({
  declarations: [ScrollbarDirective, ScrollVanishDirective],
  imports: [
    CommonModule
  ],
  exports: [ScrollbarDirective, ScrollVanishDirective]
})
export class SharedModule { }
