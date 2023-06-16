import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { GalleryComponent } from './gallery.component';
import { Meta } from '@angular/platform-browser';

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;
  let meta: Meta;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GalleryComponent],
      imports: [RouterModule.forRoot([])],
      providers: [{ provide: Meta, useClass: Meta }],
    }).compileComponents();

    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    meta = TestBed.inject(Meta);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have truthy images array', () => {
    expect(component.portfolioImages).toBeTruthy();
  });

  it('should only contain strings in the array', () => {
    const imageArray = component.portfolioImages.every((img) => {
      return typeof img.src === 'string' && typeof img.name === 'string';
    });

    expect(imageArray).toBeTrue();
  });

  it('should have a meta tag with name description', () => {
    const metaContent = meta.getTag('name=description')?.content;

    expect(metaContent).toEqual(
      'Profesionalios fotografijos paslaugos - Portfolio'
    );
  });

  it('should have a meta tag with name keyword', () => {
    const metaContent = meta.getTags('name=keyword');
    metaContent.forEach((tag) => {
      expect(tag.name).toEqual('keyword');
      expect(tag.content).toEqual(
        'Asmenine, Ivaizdzio, Sventes, Renginiai, Projektai - fotosesijos'
      );
    });
  });
});
