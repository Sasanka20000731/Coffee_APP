import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../core/config.service';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

export interface ProductGroup {
  value: number;
  name: string;
}


@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private apiUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = this.configService.getApiUrl('Inventory'); // Use 'User' controller
  }

  registerProductCategory(productCategoryData: any): Observable<any> {
    debugger
    return this.http.post<Boolean>(`${this.apiUrl}/CreateProductCategory/`, productCategoryData);
  }
  getAllProductCategories(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetAllProductCategories/`);
  }

  getProductGroups(): Observable<any> {
    return this.http.get<ProductGroup[]>(`${this.apiUrl}/GetAllProductGroups/`); // this one is not calling to backend 

  }

  // getProductCategoryById(id: number): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/GetProductCategoryById/${id}`);
  //    // https://localhost:7028/api/Inventory/GetProductCategoryById?id=1007
  //    // url should be like this

  // }

  getProductCategoryById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetProductCategoryById`, {
      params: { id: id.toString() }
    });
  }

  updateProductCategory(productCategoryData: any): Observable<any> {
    debugger
    return this.http.put<Boolean>(`${this.apiUrl}/UpdateProductCategory/`, productCategoryData);
  }



}
