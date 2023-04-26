import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { HomePageImages, homeImages } from '../../interfaces/home-page-images';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  images: HomePageImages[] = homeImages;
  formHidden: boolean = true;

  ngOnInit() {
    register();
  }
}
