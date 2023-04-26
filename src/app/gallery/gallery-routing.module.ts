import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GalleryComponent } from './gallery.component';
import { GalleryDetailsComponent } from './pages/gallery-details/gallery-details.component';
import { GalleryImagesComponent } from './pages/gallery-images/gallery-images.component';

const routes: Routes = [
  {
    path: '',
    component: GalleryComponent,
  },
  {
    path: 'name/:name',
    component: GalleryImagesComponent,
  },
  {
    path: 'name/:name/id/:id',
    component: GalleryDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GalleryRoutingModule {}
