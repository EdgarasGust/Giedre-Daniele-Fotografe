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
  galleryName: string;
  images: Image[][] = [];

  constructor(
    private route: ActivatedRoute,
    private galleryService: GalleryService
  ) {}

  ngOnInit() {
    this.getImages();
  }

  getImages() {
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.galleryName = params['name'];
      const imageArray = this.galleryService.getImages(params['name']);
      this.images = this.galleryService.spliceInToChunks(imageArray);
    });
  }

  trackById(index: number, item: Image) {
    return item.id;
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }
}
