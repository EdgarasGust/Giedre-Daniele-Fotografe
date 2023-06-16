import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Location } from '@angular/common';

import { GalleryDetailsComponent } from './gallery-details.component';
import { GalleryService } from '../../services/gallery.service';
import { Categories } from 'src/app/interfaces/categories.enum';
import * as galleryImages from '../../interfaces/galleryImages';

describe('GalleryDetailsComponent', () => {
  let component: GalleryDetailsComponent;
  let fixture: ComponentFixture<GalleryDetailsComponent>;
  let galleryService: GalleryService;
  let router: Router;
  let route: ActivatedRoute;
  let location: Location;
  const paramsSubject = new BehaviorSubject<Params>({
    name: Categories.ASMENINES,
    id: 3,
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GalleryDetailsComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: { params: paramsSubject } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GalleryDetailsComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    galleryService = TestBed.inject(GalleryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return an image array and set image index', () => {
    route.params.subscribe((params: Params) => {
      const imageArray = galleryService.getImages(params['name']);

      expect(imageArray).toEqual(galleryImages.Asmeninės);
      expect(component.imageIndex).toEqual(params['id'] - 1);
    });
  });

  it('should call swiperConfig method', () => {
    const spy = spyOn(component, 'swiperConfig');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should update route parameters and navigate to the correct URL', () => {
    const index = 1;
    const navigateSpy = spyOn(router, 'navigate');

    component.updateRouteParams(index);

    expect(navigateSpy).toHaveBeenCalledWith([`../${index + 1}`], {
      relativeTo: route,
      replaceUrl: true,
    });
  });

  it('should go back to the previous location', () => {
    const backSpy = spyOn(location, 'back');

    component.close();
    expect(backSpy).toHaveBeenCalled();
  });
});
