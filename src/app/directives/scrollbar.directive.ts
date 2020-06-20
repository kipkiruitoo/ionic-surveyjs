import { NgModule, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appScrollbar]'
})
export class ScrollbarDirective {

  constructor(el: ElementRef) {
    const stylesheet = `
      ::-webkit-scrollbar {
      width: 10px;
      }
      ::-webkit-scrollbar-track {
      background: #FAB83F;
      border-radius: 1rem;
      }
      ::-webkit-scrollbar-thumb {
      border-radius: 1rem;
      background: linear-gradient(var(--ion-color-light-tint), var(--ion-color-light));
      }
      ::-webkit-scrollbar-thumb:hover {
      }
    `;

    const styleElmt = el.nativeElement.shadowRoot.querySelector('style');

    if (styleElmt) {
      styleElmt.append(stylesheet);
    } else {
      const barStyle = document.createElement('style');
      barStyle.append(stylesheet);
      el.nativeElement.shadowRoot.appendChild(barStyle);
    }

  }

}
