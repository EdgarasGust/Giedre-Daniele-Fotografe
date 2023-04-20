import { Component } from '@angular/core';

import { homeImages } from '../../interfaces/home-page-images';

import Swiper, { Navigation, Pagination } from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  images = homeImages;

  ngOnInit() {
    const swiper = new Swiper('.swiper', {
      modules: [Navigation, Pagination],
      speed: 500,
      spaceBetween: 100,
      navigation: {
        nextEl: 'swiper-button-next',
        prevEl: 'swiper-button-next',
      },
    });
  }
}
