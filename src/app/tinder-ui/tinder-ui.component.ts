// tslint:disable-next-line: max-line-length
import { Component, Input, ViewChildren, QueryList, EventEmitter, Output, ElementRef, Renderer2, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tinder-ui',
  templateUrl: './tinder-ui.component.html',
  styleUrls: ['./tinder-ui.component.scss'],
})
export class TinderUiComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('cards') cards: Array<{
    name: string,
    id: any;
  }>;
  img = 'https://picsum.photos/300';

  @Output() choiceMade = new EventEmitter();

  @ViewChildren('tinderCard') tinderCards: QueryList<ElementRef>;

  tinderCardsArray: Array<ElementRef>;

  moveOutWidth: number; // value in pixels that a card needs to travel to dissapear from screen
  shiftRequired: boolean; // state variable that indicates we need to remove the top card of the stack
  transitionInProgress: boolean; // state variable that indicates currently there is transition on-going
  heartVisible: boolean;
  crossVisible: boolean;
  originalData: any;
  // url = https://picsum.photos/300;

  constructor(private renderer: Renderer2, private router: Router) { // we imported Renderer to be able to alter style's of elements safely

  }

  ngOnInit() {
    console.log(this.cards);
    this.originalData = this.cards;
  }

  handlePan(event) {

    if (event.deltaX === 0 || (event.center.x === 0 && event.center.y === 0) || !this.cards.length) { return; }

    if (this.transitionInProgress) {
      this.handleShift();
    }

    this.renderer.addClass(this.tinderCardsArray[0].nativeElement, 'moving');

    if (event.deltaX > 0) { this.toggleChoiceIndicator(false, true); }
    if (event.deltaX < 0) { this.toggleChoiceIndicator(true, false); }

    const xMulti = event.deltaX * 0.03;
    const yMulti = event.deltaY / 80;
    const rotate = xMulti * yMulti;

    // tslint:disable-next-line: max-line-length
    this.renderer.setStyle(this.tinderCardsArray[0].nativeElement, 'transform', 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)');

    this.shiftRequired = true;

  }

  handlePanEnd(event) {

    this.toggleChoiceIndicator(false, false);

    if (!this.cards.length) { return; }

    this.renderer.removeClass(this.tinderCardsArray[0].nativeElement, 'moving');

    const keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;
    if (keep) {

      this.renderer.setStyle(this.tinderCardsArray[0].nativeElement, 'transform', '');
      this.shiftRequired = false;

    } else {

      const endX = Math.max(Math.abs(event.velocityX) * this.moveOutWidth, this.moveOutWidth);
      const toX = event.deltaX > 0 ? endX : -endX;
      const endY = Math.abs(event.velocityY) * this.moveOutWidth;
      const toY = event.deltaY > 0 ? endY : -endY;
      const xMulti = event.deltaX * 0.03;
      const yMulti = event.deltaY / 80;
      const rotate = xMulti * yMulti;

      // tslint:disable-next-line: max-line-length
      this.renderer.setStyle(this.tinderCardsArray[0].nativeElement, 'transform', 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)');

      this.shiftRequired = true;

      this.emitChoice(!!(event.deltaX > 0), this.cards[0]);
    }
    this.transitionInProgress = true;
  }

  emitChoice(heart, card) {
    this.choiceMade.emit({
      choice: heart,
      payload: card
    });
  }


  userClickedButton(event, heart) {
    event.preventDefault();
    if (!this.cards.length) { return false; }
    if (heart) {
      this.tinderCardsArray[0].nativeElement.style.transform = 'translate(' + this.moveOutWidth + 'px, -100px) rotate(-30deg)';
      this.toggleChoiceIndicator(false, true);
    } else {
      this.tinderCardsArray[0].nativeElement.style.transform = 'translate(-' + this.moveOutWidth + 'px, -100px) rotate(30deg)';
      this.toggleChoiceIndicator(true, false);
    }
    this.shiftRequired = true;
    this.transitionInProgress = true;
  }

  toggleChoiceIndicator(cross, heart) {
    this.crossVisible = cross;
    this.heartVisible = heart;
    if (this.heartVisible) {
      setTimeout(() => {
        this.navigate(this.cards[0].id);
      }, 2000);

    }
  }

  handleShift() {
    this.transitionInProgress = false;
    this.toggleChoiceIndicator(false, false);
    if (this.shiftRequired) {
      this.shiftRequired = false;
      const first = this.cards[0];
      this.cards.shift();
      this.cards.push(first);
      console.log(this.cards.length);
    }
  }

  ngAfterViewInit() {
    this.moveOutWidth = document.documentElement.clientWidth * 1.5;
    this.tinderCardsArray = this.tinderCards.toArray();
    this.tinderCards.changes.subscribe(() => {
      this.tinderCardsArray = this.tinderCards.toArray();
    });
    console.log(this.cards);
  }

  navigate(id) {
    this.router.navigate(['/survey/' + id]);
  }


}
