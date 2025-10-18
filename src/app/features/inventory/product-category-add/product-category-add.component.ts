import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductCategory } from 'src/app/core/models/productCategory/IProductCategory';
import { InventoryService ,ProductGroup} from 'src/app/core/services/inventory/inventory.service';
import { ProductcategoryListStore } from 'src/app/core/store/productCategory-store.service';

interface DropDown {
  Value: number;
  Name: string;
}

@Component({
  selector: 'app-product-category-add',
  templateUrl: './product-category-add.component.html',
  styleUrls: ['./product-category-add.component.css']
})
export class ProductCategoryAddComponent implements OnInit, OnDestroy {
  productCategoryForm: FormGroup;
  isSubmitting = false;
  showDebug = false; // Set to true for development
  productGroups: DropDown[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private inventoryService: InventoryService,
    private productcategoryListStore: ProductcategoryListStore
  ) {
    this.productCategoryForm = this.fb.group({
      productName: ['', [Validators.required, Validators.maxLength(100)]],
      productGroup: ['', [Validators.required]], // Added productGroup form control
      productDescription: [''],
      ingreedians: [''],
      active: [true] // Default to active
    });
  }
  productGroup: ProductGroup[] = [];
  selectedproductGroupId: number | null = null;
  ngOnInit(): void {
    debugger
      this.loadProductGroups();

  }

    loadProductGroups(): void {
      //debugger
     this.inventoryService.getProductGroups().subscribe(
        (data: ProductGroup[]) => {
          console.log('User Types Loaded:', data);
          this.productGroup = data;
          debugger
        },
        (error) => {
          console.error('Error loading Product groups:', error);
          alert('Failed to load Product groups. Check the console for details.');
        }
      );
    }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.productCategoryForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getFormValue(): ProductCategory {
    return {
      ...this.productCategoryForm.value
    };
  }

  async onSubmit(): Promise<void> {
    if (this.productCategoryForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      try {
        const productCategory: ProductCategory = {
          ...this.productCategoryForm.value
        };

        this.inventoryService.registerProductCategory(productCategory).subscribe(
          (response: any) => {
            console.log('Product category registered successfully:', response);
            alert('Product category registered successfully!');
            this.productCategoryForm.reset();
            this.productCategoryForm.patchValue({ active: true }); // reset active to default
            this.router.navigate(['/inventory/product-category-view-all']);
          },
          (error: any) => {
            console.error('Error registering product category:', error);
            alert('Failed to register product category. Check the console for details.');
            this.isSubmitting = false;
          }
        );
      } catch (error) {
        console.error('Error creating product category:', error);
        alert('Error creating product category. Please try again.');
        this.isSubmitting = false;
      }
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.productCategoryForm.controls).forEach(key => {
        this.productCategoryForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    if (this.productCategoryForm.dirty) {
      if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
        this.router.navigate(['/inventory/product-category-view-all']);
      }
    } else {
      this.router.navigate(['/inventory/product-category-view-all']);
    }
  }

  // Utility method for resetting the form
  resetForm(): void {
    this.productCategoryForm.reset({
      productName: '',
      productGroup: '',
      productDescription: '',
      ingreedians: '',
      active: true
    });
  }
}