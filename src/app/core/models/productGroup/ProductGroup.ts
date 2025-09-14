
import { ProductGroup } from "./IProductGroup";

export class ProductGroupModel implements ProductGroup {
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
