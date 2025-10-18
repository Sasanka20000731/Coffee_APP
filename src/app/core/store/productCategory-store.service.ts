import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductCategory } from '../models/productCategory/IProductCategory';
import { ProductGroup } from '../models/productGroup/IProductGroup';
import { InventoryService } from '../services/inventory/inventory.service';

@Injectable({
  providedIn: 'root'
})
export class ProductcategoryListStore {
  private _productcategorys = new BehaviorSubject<ProductCategory[]>([]);
  private _loading = new BehaviorSubject<boolean>(false);
  private _error = new BehaviorSubject<string | null>(null);
  private _groups = new BehaviorSubject<ProductGroup[]>([]);
  private _selectedCategory = new BehaviorSubject<ProductCategory | null>(null);

  // Public observables
  public productcategorys$ = this._productcategorys.asObservable();
  public loading$ = this._loading.asObservable();
  public error$ = this._error.asObservable();
  public productGroups$ = this._groups.asObservable();
  public selectedCategory$ = this._selectedCategory.asObservable();

  constructor(private inventoryService: InventoryService) {}

  // Get all product categories
  loadProductCategories(): void {
    this._loading.next(true);
    this._error.next(null);

    this.inventoryService.getAllProductCategories().subscribe({
      next: (categories: ProductCategory[]) => {
        this._productcategorys.next(categories);
        this._loading.next(false);
      },
      error: (error) => {
        this._error.next('Failed to load product categories');
        this._loading.next(false);
        console.error('Error loading product categories:', error);
      }
    });
  }

    // Get selected category
  getSelectedCategory(): ProductCategory | null {
    return this._selectedCategory.value;
  }

  // Add a new product category
  addProductCategory(category: ProductCategory): void {
    const currentCategories = this._productcategorys.value;
    this._productcategorys.next([...currentCategories, category]);
  }

  // Update an existing product category
  updateProductCategory(updatedCategory: ProductCategory): void {
    const currentCategories = this._productcategorys.value;
    const updatedCategories = currentCategories.map(category =>
      category.productId === updatedCategory.productId ? updatedCategory : category
    );
    this._productcategorys.next(updatedCategories);
  }

  // Delete a product category
  deleteProductCategory(categoryId: number): void {
    const currentCategories = this._productcategorys.value;
    const filteredCategories = currentCategories.filter(category => category.productId !== categoryId);
    this._productcategorys.next(filteredCategories);
  }

// Load Product Groups
  loadProductGroups(): void {
    this._loading.next(true);
    this._error.next(null);
debugger
    this.inventoryService.getProductGroups().subscribe({
      next: (groups: ProductGroup[]) => {
        this._groups.next(groups);
        this._loading.next(false);
      },
      error: (error) => {
        this._error.next('Failed to load product categories');
        this._loading.next(false);
        console.error('Error loading product categories:', error);
      }
    });
  }

  // Add a new product category
  addProductGroups(groups: ProductCategory): void {
    const currentgroups = this._groups.value;
    this._groups.next([...currentgroups, groups]);
  }


  // Get current categories value
  getCurrentCategories(): ProductCategory[] {
    return this._productcategorys.value;
  }

  // In ProductcategoryListStore
setSelectedCategory(category: ProductCategory | null): void {
  this._selectedCategory.next(category);
}

  // Clear store
  clearStore(): void {
    this._productcategorys.next([]);
    this._error.next(null);
    this._loading.next(false);
  }
}