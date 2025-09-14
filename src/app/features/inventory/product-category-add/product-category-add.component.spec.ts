import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCategoryAddComponent } from './product-category-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductCategoryAddComponent', () => {
  let component: ProductCategoryAddComponent;
  let fixture: ComponentFixture<ProductCategoryAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCategoryAddComponent],
      imports: [
        ReactiveFormsModule,      // 👈 Needed for [formGroup], formControlName
        RouterTestingModule       // 👈 Needed because your component injects Router
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCategoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
