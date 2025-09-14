
import { ProductCategory } from "./IProductCategory";

export class ProductCategoryModel implements ProductCategory {
    productId: number;
    productName: string;
    productDescription: string;
    ingredians: string;
    active: boolean = true;
    constructor(
        productId: number,
        productName: string,
        productDescription: string,
        ingredians: string,
        active: boolean = true,
    ) {
        this.productId = productId;
        this.productName = productName;
        this.productDescription = productDescription;
        this.ingredians = ingredians;
        this.active = active;
    }

}
