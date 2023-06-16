import { TestBed } from '@angular/core/testing';

import { GalleryService } from './gallery.service';
import * as galleryImages from '../interfaces/galleryImages';
import { Categories } from 'src/app/interfaces/categories.enum';

describe('GalleryService', () => {
  let service: GalleryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GalleryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return Asmeninės images when the category is ASMENINES', () => {
    const expectedImages = galleryImages.Asmeninės;
    const result = service.getImages(Categories.ASMENINES);
    expect(result).toEqual(expectedImages);
  });

  it('should return Ivaizdis images when the category is IVAIZDZIO', () => {
    const expectedImages = galleryImages.Ivaizdis;
    const result = service.getImages(Categories.IVAIZDZIO);
    expect(result).toEqual(expectedImages);
  });

  it('should return Sventes images when the category is SVENTES', () => {
    const expectedImages = galleryImages.Sventes;
    const result = service.getImages(Categories.SVENTES);
    expect(result).toEqual(expectedImages);
  });

  it('should return Renginiai images when the category is RENGINIAI', () => {
    const expectedImages = galleryImages.Renginiai;
    const result = service.getImages(Categories.RENGINIAI);
    expect(result).toEqual(expectedImages);
  });

  it('should return Projektai images when the category is PROJEKTAI', () => {
    const expectedImages = galleryImages.Projektai;
    const result = service.getImages(Categories.PROJEKTAI);
    expect(result).toEqual(expectedImages);
  });

  it('should return a copy of filteredImages', () => {
    const result = service.getImages(Categories.ASMENINES);
    expect(result).toEqual(service.filteredImages);
  });

  it('should splice an array in to 3 chunks', () => {
    const imagesArray = [
      {
        src: 'image1',
        id: 1,
      },
      {
        src: 'image2',
        id: 2,
      },
      {
        src: 'image3',
        id: 3,
      },
    ];

    const result = service.spliceInToChunks(imagesArray);

    expect(result).toEqual([
      [
        {
          src: 'image1',
          id: 1,
        },
      ],
      [
        {
          src: 'image2',
          id: 2,
        },
      ],
      [
        {
          src: 'image3',
          id: 3,
        },
      ],
    ]);
  });

  it('should return the index of the image', () => {
    const result = service.getImageIndex(Categories.ASMENINES, 2);

    expect(result).toEqual(1);
  });
});
