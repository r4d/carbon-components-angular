// modules
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Search16Module } from "@carbon/icons-angular/lib/search/16";
import { Close16Module } from "@carbon/icons-angular/lib/close/16";

// imports
import { I18nModule } from "../i18n/i18n.module";
import { Search } from "./search.component";

@NgModule({
	declarations: [
		Search
	],
	exports: [
		Search
	],
	imports: [
		FormsModule,
		CommonModule,
		I18nModule,
		Search16Module,
		Close16Module
	]
})
export class SearchModule { }

export { Search };
