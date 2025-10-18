import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductCategory } from 'src/app/core/models/productCategory/IProductCategory';
// import { ProductGroup } from 'src/app/core/models/productGroup/IProductGroup';
import { InventoryService,ProductGroup } from 'src/app/core/services/inventory/inventory.service';
import { ProductcategoryListStore } from 'src/app/core/store/productCategory-store.service';

@Component({
  selector: 'app-product-category-update',
  templateUrl: './product-category-update.component.html',
  styleUrls: ['./product-category-update.component.css']
})
export class ProductCategoryUpdateComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  productGroups: ProductGroup[] = [];
  selectedCategory: ProductCategory | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private productcategoryListStore: ProductcategoryListStore,
    private route: ActivatedRoute,
    private router: Router
  ) {}


  ngOnInit(): void {
    debugger
        
    this.initForm();
    debugger
this.loadProductGroups();

    // Subscribe to selectedCategory from store
    this.productcategoryListStore.selectedCategory$
      .pipe(takeUntil(this.destroy$))
      .subscribe(category => {
        //debugger
        if (category) {
          this.selectedCategory = category;
          debugger
          this.patchForm(category);
        } else {
          // If store is empty, fetch category by id from route
          debugger
          const id = Number(this.route.snapshot.paramMap.get('id'));
          if (id) {
            this.inventoryService.getProductCategoryById(id).subscribe({
              next: (data) => {
                debugger
                this.selectedCategory = data[0]; // Assuming the API returns an array
                this.patchForm(this.selectedCategory!);
              },
              error: (err) => console.error('Error fetching category by id', err)
            });
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initForm(): void {
    this.form = this.fb.group({
      productName: ['', Validators.required],
      productDescription: [''],
      ingreedians: [''],
      active: [false],
      productGroupId: [null, Validators.required]
    });
  }

  private patchForm(category: ProductCategory): void {
debugger
    this.form.patchValue({

      productName: category.productName,
      productDescription: category.productDescription,
      ingreedians: category.ingreedians,
      active: category.active,
      productGroupId: category.productGroupId
    });
  }

  loadProductGroups(): void {
    this.inventoryService.getProductGroups().subscribe({
      next: (data: ProductGroup[]) => {
        //debugger
            console.log('Loaded Product Groups:', data);
        this.productGroups = data;
      },
      error: (error) => {
        console.error('Error loading Product groups:', error);
        alert('Failed to load Product groups.');
      }
    });
  }

  
  onSubmit(): void {
    if (this.form.valid && this.selectedCategory) {
      const updatedCategory: ProductCategory = {
        ...this.selectedCategory,
        ...this.form.value
      };

      this.inventoryService.updateProductCategory(updatedCategory).subscribe({
        next: () => {
          alert('Product Category updated successfully');
          this.router.navigate(['/inventory/product-category-view-all']);
        },
        error: (err) => {
          console.error('Update failed:', err);
          alert('Update failed');
        }
      });
    }
  }
}
