import { Injectable } from '@angular/core';
import { Categories } from '../../interfaces/categories';
import { Image } from '../interfaces/image.interface';

import { OtherImages, WeddingImages } from '../interfaces/imageCategory';
import * as otherImages from '../interfaces/other-images';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  filteredImages: Image[];
  constructor() {}

  getImageCategories(category: string) {
    let images: Image[] = [];
    if (category === Categories.vestuves) {
      images = WeddingImages;
    } else if (category === Categories.ivairios) {
      images = OtherImages;
    }
    return images;
  }

  getImages(imageName: string): Image[] {
    if (imageName === 'Goda') {
      this.filteredImages = otherImages.Goda;
    } else if (imageName === 'Antanas') {
      this.filteredImages = otherImages.Antanas;
    } else if (imageName === 'Gytis') {
      this.filteredImages = otherImages.Gytis;
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
    // return imageArray[imageIndex];
  }
}
