import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryViewAllComponent } from './product-category-view-all.component';

describe('ProductCategoryViewAllComponent', () => {
  let component: ProductCategoryViewAllComponent;
  let fixture: ComponentFixture<ProductCategoryViewAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCategoryViewAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCategoryViewAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
