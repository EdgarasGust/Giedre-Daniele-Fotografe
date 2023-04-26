import { Component } from '@angular/core';

import { Image } from './interfaces/image.interface';
import { PortfolioImages } from './interfaces/imageCategory';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent {
  portfolioImages: Image[] = PortfolioImages;
}
