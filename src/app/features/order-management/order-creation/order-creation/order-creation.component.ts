import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-order-creation',
  templateUrl: './order-creation.component.html',
  styleUrls: ['./order-creation.component.css']
})
export class OrderCreationComponent implements OnInit {

  orderForm!: FormGroup;
  isSubmitting = false;
  showDebug = true;

  // Example lists - replace/fetch from API as needed
  productCategories = [
    { id: 1, name: 'Coffee' },
    { id: 2, name: 'Tea' },
    { id: 3, name: 'Pastry' }
  ];

  availableExtras = [
    { ItemId: 1, ItemName: 'Milk' },
    { ItemId: 2, ItemName: 'Sugar' },
    { ItemId: 3, ItemName: 'Whipped Cream' },
    { ItemId: 4, ItemName: 'Caramel' }
  ];

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      OrderProductCategory: [null, Validators.required],
      Quantity: [1, [Validators.required, Validators.min(1)]],
      SpecialName: [''],
      SpecialDescription: [''],
      ExtraItems: this.fb.array([]) // will contain FormGroup { ItemId, ItemName }
    });
  }

  get extraItems(): FormArray {
    return this.orderForm.get('ExtraItems') as FormArray;
  }

  // Add an extra (used by template Add button)
  addExtra(extra: { ItemId: number; ItemName: string }): void {
    if (this.isExtraSelected(extra)) {
      return;
    }
    this.extraItems.push(this.fb.group({
      ItemId: [extra.ItemId],
      ItemName: [extra.ItemName]
    }));
  }

  // Helper used by template to disable Add button when already selected
  isExtraSelected(extra: { ItemId: number; ItemName: string }): boolean {
    return this.extraItems.controls.some(ctrl => ctrl.value.ItemId === extra.ItemId);
  }

  // toggle an extra item (checkbox) - kept for compatibility if used elsewhere
  toggleExtra(extra: { ItemId: number; ItemName: string }, checked: boolean): void {
    if (checked) {
      if (!this.isExtraSelected(extra)) {
        this.extraItems.push(this.fb.group({
          ItemId: [extra.ItemId],
          ItemName: [extra.ItemName]
        }));
      }
    } else {
      const idx = this.extraItems.controls.findIndex(ctrl => ctrl.value.ItemId === extra.ItemId);
      if (idx > -1) {
        this.extraItems.removeAt(idx);
      }
    }
  }

  removeExtraAt(index: number): void {
    this.extraItems.removeAt(index);
  }

  buildPayload(): any {
    // Ensure payload matches COFEE.Shared.Models.Order
    const value = this.orderForm.value;
    return {
      OrderProductCategory: Number(value.OrderProductCategory),
      Quantity: Number(value.Quantity),
      SpecialName: value.SpecialName ?? '',
      SpecialDescription: value.SpecialDescription ?? '',
      ExtraItems: (value.ExtraItems || []).map((e: any) => ({
        ItemId: Number(e.ItemId),
        ItemName: e.ItemName ?? ''
      }))
    };
  }

  onSubmit(): void {
    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      return;
    }

    const payload = this.buildPayload();
    this.isSubmitting = true;

    // Replace URL with your API endpoint
    this.http.post('/api/orders', payload)
      .pipe(finalize(() => this.isSubmitting = false))
      .subscribe({
        next: res => {
          // handle success (navigate, toast, etc.)
          console.log('Order saved', res);
          this.orderForm.reset({ Quantity: 1 });
          this.extraItems.clear();
        },
        error: err => {
          console.error('Order save failed', err);
        }
      });
  }

  // debug helper
  getFormValue() {
    return this.orderForm.getRawValue();
  }

}
