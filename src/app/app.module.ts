import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CarouselComponent } from './components/carousel/carousel.component';
import { SongChipComponent } from './components/song-chip/song-chip.component';
import { CarouselItemComponent } from './components/carousel-item/carousel-item.component';
import { TypeaheadComponent } from './components/typeahead/typeahead.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreatePlaylistPageComponent } from './pages/create-playlist-page/create-playlist-page.component';
import { PlaylistTableComponent } from './components/playlist-table/playlist-table.component';
import { TableRowComponent } from './components/table-row/table-row.component';
import { RowDropdownComponent } from './components/row-dropdown/row-dropdown.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    SongChipComponent,
    CarouselItemComponent,
    TypeaheadComponent,
    CreatePlaylistPageComponent,
    PlaylistTableComponent,
    TableRowComponent,
    RowDropdownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  entryComponents: [SongChipComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
