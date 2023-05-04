import { ChangeDetectionStrategy, Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import {
  HomePageImages,
  HomeImages,
} from '../../interfaces/home-page-images.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  images: HomePageImages[] = HomeImages;
  formHidden: boolean = true;

  ngOnInit() {
    register();
  }
}
