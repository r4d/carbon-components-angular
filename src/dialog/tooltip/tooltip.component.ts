import {
	Component,
	TemplateRef,
	HostBinding,
	Input,
	ElementRef
} from "@angular/core";
import { getFocusElementList } from "./../../common/tab.service";

import { Dialog } from "./../dialog.component";
import { position } from "@carbon/utils-position";

/**
 * Extend the `Dialog` component to create a tooltip for exposing content.
 */
@Component({
	selector: "ibm-tooltip",
	template: `
		<div
			#dialog
			[id]="dialogConfig.compID"
			[attr.role]="role"
			[attr.data-floating-menu-direction]="placement"
			class="bx--tooltip bx--tooltip--shown">
			<span class="bx--tooltip__caret" aria-hidden="true"></span>
			<ng-template
					*ngIf="hasContentTemplate"
					[ngTemplateOutlet]="dialogConfig.content"
					[ngTemplateOutletContext]="{tooltip: this}">
			</ng-template>
			<p
				*ngIf="!hasContentTemplate">
				{{dialogConfig.content}}
			</p>
		</div>
		`
})
export class Tooltip extends Dialog {
	@HostBinding("style.display") style = "inline-block";
	/**
	 * Value is set to `true` if the `Tooltip` is to display a `TemplateRef` instead of a string.
	 */
	public hasContentTemplate = false;
	/**
	 * Sets the role of the tooltip. If there's no focusable content we leave it as a `tooltip`,
	 * if there _is_ focusable content we switch to the interactive `dialog` role.
	 */
	public role = "tooltip";

	constructor(protected elementRef: ElementRef) {
		super(elementRef);
	}

	/**
	 * Check whether there is a template for the `Tooltip` content.
	 */
	onDialogInit() {
		this.addGap["bottom"] = pos => {
			return position.addOffset(pos, 3, 0);
		};
		this.addGap["top"] = pos => {
			return position.addOffset(pos, -10, 0);
		};
		this.addGap["left"] = pos => {
			return position.addOffset(pos, -3, -6);
		};
		this.addGap["right"] = pos => {
			return position.addOffset(pos, -3, 6);
		};

		this.hasContentTemplate = this.dialogConfig.content instanceof TemplateRef;
	}

	afterDialogViewInit() {
		const focusableElements = getFocusElementList(this.dialog.nativeElement);
		if (focusableElements.length > 0) {
			this.role = "dialog";
			focusableElements[0].focus();
		}
	}
}
