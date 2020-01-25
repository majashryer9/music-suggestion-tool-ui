import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CarouselComponent } from './components/carousel/carousel.component';
import { SongChipComponent } from './components/song-chip/song-chip.component';
import { CarouselItemComponent } from './components/carousel-item/carousel-item.component';

@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    SongChipComponent,
    CarouselItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  entryComponents: [SongChipComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
