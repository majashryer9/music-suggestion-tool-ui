import { Component, OnInit, Input } from '@angular/core';
import { CarouselItem } from 'src/app/models/CarouselItem';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @Input() items: CarouselItem<any, any>[];
  @Input() numItemsToShowAtOneTime: number;
  @Input() widthOfEachItem: number;
  @Input() spaceBetweenItems: number;
  containerWidth: number;
  translation = '0px';
  curIndex = 0;
  constructor() { }

  ngOnInit() {
    this.containerWidth = this.numItemsToShowAtOneTime * this.widthOfEachItem + (this.numItemsToShowAtOneTime + 1) * this.spaceBetweenItems;
  }

  slide(changeIndexAmount: -1 | 1): void {
    const newIndex = this.curIndex + changeIndexAmount;
    if (0 <= newIndex && newIndex <= this.items.length - this.numItemsToShowAtOneTime) {
      this.curIndex = newIndex;
      this.setTranslation();
    }
  }

  setTranslation(): void {
    this.translation = `translateX(-${this.curIndex * (this.widthOfEachItem + this.spaceBetweenItems)}px)`;
  }
}
