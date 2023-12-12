import { NgClass } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Sidebar, sidebarData } from '@data/sidebar.data';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  public data: Sidebar[] = sidebarData;
  private router = inject(Router);

  ngOnInit(): void {}

  public routeIsActive(url: string): boolean {
    const index = this.router.url.indexOf('?');
    const splitUrl = index !== -1 ? this.router.url.slice(0, index) : this.router.url;
    let urlPage = '';
    if (url.includes('page')) {
      urlPage = url.slice(0, url.indexOf('?'));
    } else {
      urlPage = url;
    }
    return urlPage === splitUrl;
  }

  public goTo(url: string): void {
    if (url.includes('http') || url.includes('https')) {
      window.open(url, '_blank');
    } else {
      this.router.navigateByUrl(url);
    }
  }
}
