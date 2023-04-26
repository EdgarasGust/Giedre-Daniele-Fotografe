import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { Image } from '../../interfaces/image.interface';
import { GalleryService } from '../../services/gallery.service';

@Component({
  selector: 'app-gallery-images',
  templateUrl: './gallery-images.component.html',
  styleUrls: ['./gallery-images.component.scss'],
})
export class GalleryImagesComponent implements OnInit, OnDestroy {
  paramsSubscription: Subscription;
  objectName: string;
  images: Image[][] = [];

  constructor(
    private route: ActivatedRoute,
    private galService: GalleryService
  ) {}

  ngOnInit() {
    this.getImages();
  }

  getImages() {
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.objectName = params['name'];
      const imageArray = this.galService.getImages(params['name']);

      // const imageArray = this.galService.findArrayByName(params['name']);
      this.spliceInToChunks(imageArray);
    });
  }

  spliceInToChunks(arr: Image[]) {
    const count = Math.round(arr.length / 3);
    const chunkArray = [];
    while (arr.length > 0) {
      const chunk = arr.splice(0, count);
      const mappedChunk = chunk.map((img: Image) => ({
        src: img.src,
        id: img.id,
      }));
      chunkArray.push(mappedChunk);
    }
    this.images = chunkArray;
  }

  trackByIndex(index: number, item: any) {
    return item;
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }
}
