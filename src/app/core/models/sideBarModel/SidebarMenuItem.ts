import { ISidebarMenuItem } from "./ISidebarMenuItem";

export class SidebarMenuItem implements ISidebarMenuItem {
    lable: string;
    route: string;
subItems?: SidebarMenuItem[];



    constructor(lable: string, route: string) {
        this.lable = lable;
        this.route = route;
        this.subItems = [];
    }
}