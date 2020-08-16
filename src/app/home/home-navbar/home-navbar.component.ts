import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['../home.component.scss']
})
export class HomeNavbarComponent implements OnInit {

  isCollapsed: boolean = true;
  isLoggedIn: boolean;

  constructor() { }

  ngOnInit(): void {
    if(sessionStorage.getItem('token') != null){
      this.isLoggedIn = true;
    }
    else{
      this.isLoggedIn = false;
    }
  }

  @HostListener('window:scroll', ['$event'])

  onWindowScroll(e) {
    if (window.pageYOffset > 50) {
      let element = document.getElementById('mainNav');
      element.classList.add('navbar-scrolled');
    } else {
      let element = document.getElementById('mainNav');
      element.classList.remove('navbar-scrolled');
    }
  }

  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  signout() {
    sessionStorage.clear();
    this.isLoggedIn = false;
    //this.router.navigate(['/login']);
  }

}
