import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { Dropdown } from "./dropdown.component";
import { DropdownList } from "./list/dropdown-list.component";

import { ScrollableList } from "./scrollable-list.directive";
import { I18nModule } from "./../i18n/i18n.module";
import { PlaceholderModule } from "./../placeholder/placeholder.module";
import { DropdownService } from "./dropdown.service";
import { ChevronDown16Module } from "@carbon/icons-angular/lib/chevron--down/16";
import { WarningFilled16Module } from "@carbon/icons-angular/lib/warning--filled/16";

export { Dropdown } from "./dropdown.component";
export { DropdownList } from "./list/dropdown-list.component";

export { ScrollableList } from "./scrollable-list.directive";
export { AbstractDropdownView } from "./abstract-dropdown-view.class";
export { ListItem } from "./list-item.interface";
export { DropdownService } from "./dropdown.service";

@NgModule({
	declarations: [
		Dropdown,
		DropdownList,
		ScrollableList
	],
	exports: [
		Dropdown,
		DropdownList,
		ScrollableList
	],
	imports: [
		CommonModule,
		FormsModule,
		I18nModule,
		PlaceholderModule,
		ChevronDown16Module,
		WarningFilled16Module
	],
	providers: [ DropdownService ]
})
export class DropdownModule {}
