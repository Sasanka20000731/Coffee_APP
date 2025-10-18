import { Component, OnInit, OnDestroy } from '@angular/core';
import { InventoryService } from 'src/app/core/services/inventory/inventory.service';
import { ProductCategory } from 'src/app/core/models/productCategory/IProductCategory';
import { Router } from '@angular/router';
import { ProductcategoryListStore } from 'src/app/core/store/productCategory-store.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-product-category-view-all',
  templateUrl: './product-category-view-all.component.html',
  styleUrls: ['./product-category-view-all.component.css']
})
export class ProductCategoryViewAllComponent implements OnInit, OnDestroy {
  productcategoryList: ProductCategory[] = [];
  loading = false;
  error: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private inventoryService: InventoryService,
    private router: Router,
    private productcategoryListStore: ProductcategoryListStore
  ) { }

  ngOnInit(): void {
    // Subscribe to store observables
    this.productcategoryListStore.productcategorys$
      .pipe(takeUntil(this.destroy$))
      .subscribe(productcategorys => {
        this.productcategoryList = productcategorys;
      });

    this.productcategoryListStore.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(loading => {
        this.loading = loading;
      });

    this.productcategoryListStore.error$
      .pipe(takeUntil(this.destroy$))
      .subscribe(error => {
        this.error = error;
      });

    // Load product categories
    this.loadProductCategories();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadProductCategories(): void {

    this.productcategoryListStore.loadProductCategories();
  }

  onViewCategory(category: ProductCategory): void {
    this.router.navigate(['/product-category', category.productId]);
  }

onEditCategory(category: ProductCategory): void {

  this.productcategoryListStore.setSelectedCategory(category);
  this.router.navigate(['/inventory/product-category-update', category.productId]);
}

// onEditCategory(category: ProductCategory): void {
//   this.productcategoryListStore.setSelectedCategory(category);
//   this.router.navigate(['/inventory/product-category-update', category.productId]);
// }


  onAddCategory(): void {
    this.router.navigate(['/product-category/add']);
  }

  refreshList(): void {
    this.loadProductCategories();
  }
}