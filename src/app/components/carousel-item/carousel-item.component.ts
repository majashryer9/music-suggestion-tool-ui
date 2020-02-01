import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { CarouselItem } from 'src/app/models/CarouselItem';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.scss']
})
export class CarouselItemComponent implements OnInit, OnDestroy {

  @Output() removeItemFromCarousel = new EventEmitter();
  @Input() item: CarouselItem<any, any>;
  @ViewChild('itemContainer', { read: ViewContainerRef, static: true }) itemContainer: ViewContainerRef;
  removeSubscription: Subscription;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.loadComponent();
  }

  ngOnDestroy() {
    this.removeSubscription.unsubscribe();
  }

  loadComponent(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.item.component);
    const componentRef = this.itemContainer.createComponent<any>(componentFactory);
    componentRef.instance.id = this.item.id;
    componentRef.instance.data = this.item.data;
    this.removeSubscription = componentRef.instance.removeItemFromCarousel
      .subscribe((id: string) => this.removeItemFromCarousel.emit(id));
  }
}
