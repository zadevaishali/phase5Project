import { Component, OnInit } from '@angular/core';
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-nav-bar',
  templateUrl: './admin-nav-bar.component.html',
  styleUrls: ['./admin-nav-bar.component.css'],
})
export class AdminNavBarComponent implements OnInit {
  constructor() {}
  faHamburger = faBars;
  faClose = faClose;
  showHamburger: boolean = true;
  ngOnInit(): void {}
  toggleMenu() {
    let menu = document.getElementById('menu');
    if (menu?.style.display === 'none') {
      menu.style.display = 'block';
      this.showHamburger = false;
    } else {
      menu.style.display = 'none';
      this.showHamburger = true;
    }
  }
  toggleMenuAndLogout() {
    this.toggleMenu();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
