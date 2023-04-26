import { Injectable } from '@angular/core';
import { Categories } from '../../interfaces/categories';
import { Image } from '../interfaces/image.interface';

import { OtherImages, WeddingImages } from '../interfaces/imageCategory';
import * as otherImages from '../interfaces/other-images';
import { Weddings } from '../interfaces/wedding-images';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  filteredImages: Image[];
  category: string;

  // getImageCategories(category: string) {
  //   let images: Image[] = [];
  //   if (category === Categories.vestuves) {
  //     images = WeddingImages;
  //   } else if (category === Categories.ivairios) {
  //     this.category = Categories.ivairios;
  //     images = OtherImages;
  //   }
  //   return images;
  // }

  getImages(imageName: string): Image[] {
    if (imageName === 'Asmeninė fotosesija') {
      this.filteredImages = otherImages.Asmeninės;
    } else if (imageName === 'Įvaizdžio fotosesija') {
      this.filteredImages = otherImages.Ivaizdis;
    } else if (imageName === 'Šventės') {
      this.filteredImages = otherImages.Sventes;
    } else if (imageName === 'Renginiai') {
      this.filteredImages = otherImages.Gytis;
    } else if (imageName === 'Projektai') {
      this.filteredImages = otherImages.Projektai;
    }
    return this.filteredImages.slice();
  }

  // Not working
  // findArrayByName(targetName: string) {
  //   let weddingsImageArray;
  //   //Will fail on refresh!
  //   if (this.category === Categories.ivairios) {
  //     const weddings = Weddings;
  //     weddingsImageArray = weddings.find((e) => {
  //       return e[0].name === targetName;
  //     });
  //     if (weddingsImageArray) {
  //       this.filteredImages = weddingsImageArray;
  //     }
  //   }
  //   return this.filteredImages.slice();
  // }

  getImageIndex(name: string, id: number) {
    let imageIndex: number;
    const imageArray = this.getImages(name);
    imageIndex = imageArray.findIndex((img) => {
      return img.id === id;
    });
    return imageIndex;
  }
}
