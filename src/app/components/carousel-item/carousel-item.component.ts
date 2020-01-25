import { Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { CarouselItem } from 'src/app/models/CarouselItem';

@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.scss']
})
export class CarouselItemComponent implements OnInit {

  @Input() item: CarouselItem<any, any>;
  @ViewChild('itemContainer', { read: ViewContainerRef, static: true }) itemContainer: ViewContainerRef;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.loadComponent();
  }

  loadComponent(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.item.component);
    const componentRef = this.itemContainer.createComponent<any>(componentFactory);
    componentRef.instance.data = this.item.data;
  }
}
