import { Injectable } from '@angular/core';
import { Image } from '../interfaces/image.interface';

import { Categories } from '../../interfaces/categories.enum';
import * as galleryImages from '../interfaces/galleryImages';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  filteredImages: Image[];

  getImages(imageName: string): Image[] {
    if (imageName === Categories.ASMENINES) {
      this.filteredImages = galleryImages.Asmeninės;
    } else if (imageName === Categories.IVAIZDZIO) {
      this.filteredImages = galleryImages.Ivaizdis;
    } else if (imageName === Categories.SVENTES) {
      this.filteredImages = galleryImages.Sventes;
    } else if (imageName === Categories.RENGINIAI) {
      this.filteredImages = galleryImages.Ivaizdis;
    } else if (imageName === Categories.PROJEKTAI) {
      this.filteredImages = galleryImages.Projektai;
    }
    return this.filteredImages.slice();
  }

  getImageIndex(name: string, id: number) {
    let imageIndex: number;
    const imageArray = this.getImages(name);
    imageIndex = imageArray.findIndex((img) => {
      return img.id === id;
    });
    return imageIndex;
  }
}
