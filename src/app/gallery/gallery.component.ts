import { Component } from '@angular/core';

import { Image } from './interfaces/image.interface';
import { PortfolioImages } from './interfaces/portfolioCategories';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent {
  portfolioImages: Image[] = PortfolioImages;

  constructor(private meta: Meta) {
    meta.addTags([
      {
        name: 'description',
        content: 'Profesionalios fotografijos paslaugos - Portfolio',
      },
      {
        name: 'keyword',
        content:
          'Asmenine, Ivaizdzio, Sventes, Renginiai, Projektai - fotosesijos',
      },
    ]);
  }
}
