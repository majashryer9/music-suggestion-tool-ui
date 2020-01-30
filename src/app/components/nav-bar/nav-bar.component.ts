import { Component, OnInit } from '@angular/core';
import { NavLink } from 'src/app/models/NavLink';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  navLinks: NavLink[] = [
    {
      linkName: 'Home',
      route: '',
      active: true
    },
    {
      linkName: 'Create A Playlist',
      route: '/create-playlist',
      active: false
    },
    {
      linkName: 'Login/Register',
      route: '/login',
      active: false
    }
  ];
  constructor(private location: Location) { }

  ngOnInit() {
    this.setActiveLink(this.location.path());
  }

  setActiveLink(route: string): void {
    this.navLinks = this.navLinks.map(navLink => {
      navLink.active = navLink.route === route;
      return navLink;
    });
  }
}
