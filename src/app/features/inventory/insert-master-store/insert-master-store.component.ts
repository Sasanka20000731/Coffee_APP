import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-insert-master-store',
  templateUrl: './insert-master-store.component.html',
  styleUrls: ['./insert-master-store.component.css']
})
export class InsertMasterStoreComponent implements OnInit {
  // Properties for form fields
  selectedProductCategoryId: number | null = null;
  productCategories = [
    { value: 1, name: 'Electronics' },
    { value: 2, name: 'Furniture' },
    { value: 3, name: 'Clothing' },
    // Add more categories as needed
  ];

  //constructor() { }

  ngOnInit(): void {
  }

    // Method to handle form submission
    onSubmit(form: NgForm) {
      if (form.valid) {
        const formData = {
          purchasedCount: form.value.purchasedCount,
          unitPrice: form.value.unitPrice,
          purchasedDate: form.value.purchasedDate,
          productCategory: form.value.productCategory
        };
  
        console.log('Form Data:', formData);
  
        // Here you would typically send the form data to the API
        // Example: this.yourService.insertMasterStore(formData).subscribe(...);
      } else {
        console.log('Form is invalid');
      }
    }

}
