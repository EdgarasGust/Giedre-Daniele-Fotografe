import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';

import { GalleryImagesComponent } from './gallery-images.component';
import { GalleryService } from '../../services/gallery.service';
import { BehaviorSubject } from 'rxjs';

import { Categories } from '../../../interfaces/categories.enum';
import * as galleryImages from '../../interfaces/galleryImages';

describe('GalleryImagesComponent', () => {
  let component: GalleryImagesComponent;
  let fixture: ComponentFixture<GalleryImagesComponent>;
  let galleryService: GalleryService;
  let route: ActivatedRoute;
  const paramsSubject = new BehaviorSubject<Params>({
    name: Categories.ASMENINES,
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GalleryImagesComponent],
      imports: [RouterModule.forRoot([])],
      providers: [
        { provide: ActivatedRoute, useValue: { params: paramsSubject } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GalleryImagesComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
    galleryService = TestBed.inject(GalleryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the galleryName, return an array of images and component image array to be length of 3', () => {
    route.params.subscribe((params: Params) => {
      const imageArray = galleryService.getImages(params['name']);

      expect(component.galleryName).toEqual(params['name']);
      expect(imageArray).toEqual(galleryImages.Asmeninės);
      expect(component.images.length).toBe(3);
    });
  });

  it('should return chunked images array', () => {
    const mockImages = [
      { src: 'image1', id: 1 },
      { src: 'image2', id: 2 },
      { src: 'image3', id: 3 },
    ];

    const mockedChunkedImages = [
      [{ src: 'image1', id: 1 }],
      [{ src: 'image2', id: 2 }],
      [{ src: 'image3', id: 3 }],
    ];

    const chunkedImages = galleryService.spliceInToChunks(mockImages);

    expect(chunkedImages).toEqual(mockedChunkedImages);
    expect(chunkedImages.length).toBe(3);
  });
});
