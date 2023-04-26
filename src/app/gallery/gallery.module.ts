import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery.component';
import { GalleryImagesComponent } from './pages/gallery-images/gallery-images.component';

import { GalleryDetailsComponent } from './pages/gallery-details/gallery-details.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GalleryComponent,
    GalleryImagesComponent,
    GalleryDetailsComponent,
  ],
  imports: [CommonModule, GalleryRoutingModule, FormsModule],
})
export class GalleryModule {}
