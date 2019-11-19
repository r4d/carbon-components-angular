import {
	Component,
	Input,
	Output,
	EventEmitter,
	HostBinding,
	HostListener
} from "@angular/core";
import { TableModel } from "./../table-model.class";
import { I18n, Overridable } from "./../../i18n/i18n.module";
import { TableItem } from "./../table-item.class";
import { Observable } from "rxjs";

@Component({
	// tslint:disable-next-line: component-selector
	selector: "[ibmTableRow]",
	template: `
		<ng-container *ngIf="model">
			<td
				*ngIf="model.hasExpandableRows()"
				ibmTableExpandButton
				[expanded]="expanded"
				[expandable]="expandable"
				[skeleton]="skeleton"
				[ariaLabel]="getExpandButtonAriaLabel()"
				(expandRow)="expandRow.emit()">
			</td>
			<td
				*ngIf="!skeleton && showSelectionColumn && !enableSingleSelect"
				ibmTableCheckbox
				[size]="size"
				[selected]="selected"
				[label]="getCheckboxLabel()"
				[row]="row"
				[skeleton]="skeleton"
				(change)="onSelectionChange()">
			</td>
			<td
				*ngIf="!skeleton && showSelectionColumn && enableSingleSelect"
				ibmTableRadio
				[selected]="selected"
				[label]="getCheckboxLabel()"
				[row]="row"
				[skeleton]="skeleton"
				(change)="onSelectionChange()">
			</td>
			<ng-container *ngFor="let item of row; let j = index">
				<td
					*ngIf="model.header[j].visible"
					ibmTableData
					[item]="item"
					[class]="model.header[j].className"
					[ngStyle]="model.header[j].style"
					[skeleton]="skeleton">
				</td>
			</ng-container>
		</ng-container>
		<ng-content></ng-content>
	`
})
export class TableRowComponent {
	/**
	 * `TableModel` with data the table is to display.
	 */
	@Input() model: TableModel;

	@Input() row: TableItem[];

	@Input() expanded = false;

	@Input() expandable = false;

	@Input() selected = false;

	/**
	 * Size of the table rows.
	 */
	@Input() size: "sm" | "md" | "lg" = "md";

	/**
	 * Controls whether to enable multiple or single row selection.
	 */
	@Input() enableSingleSelect = false;

	@Input()
	set expandButtonAriaLabel(value: string | Observable<string>) {
		this._expandButtonAriaLabel.override(value);
	}

	get expandButtonAriaLabel() {
		return this._expandButtonAriaLabel.value;
	}

	@Input()
	set checkboxLabel(value: string | Observable<string>) {
		this._checkboxLabel.override(value);
	}

	get checkboxLabel() {
		return this._checkboxLabel.value;
	}

	/**
	 * Controls whether to show the selection checkboxes column or not.
	 */
	@Input() showSelectionColumn = true;

	/**
	 * Used to populate the row selection checkbox label with a useful value if set.
	 *
	 * Example:
	 * ```
	 * <ibm-table [selectionLabelColumn]="0"></ibm-table>
	 * <!-- results in aria-label="Select first column value"
	 * (where "first column value" is the value of the first column in the row -->
	 * ```
	 */
	@Input() selectionLabelColumn: number;

	@Input() skeleton = false;

	/**
	 * Emits when the row is selected.
	 */
	@Output() selectRow = new EventEmitter();

	/**
	 * Emits when the row is deselected.
	 */
	@Output() deselectRow = new EventEmitter();

	/**
	 * Emits when the row is expanded
	 */
	@Output() expandRow = new EventEmitter();

	@HostBinding("class.bx--data-table--selected") get selectedClass() {
		return this.selected;
	}

	@HostBinding("class.bx--parent-row") get parentRowClass() {
		return this.expandable;
	}

	@HostBinding("class.bx--expandable-row") get expandableRowClass() {
		return this.expanded;
	}

	@HostBinding("class.tbody_row--selectable") get selectableClass() {
		return false; // this.singleSelect
	}

	@HostBinding("attr.data-parent-row") get isParentRow() {
		return this.expandable ? true : null;
	}

	protected _checkboxLabel = this.i18n.getOverridable("TABLE.CHECKBOX_ROW");
	protected _expandButtonAriaLabel = this.i18n.getOverridable("TABLE.EXPAND_BUTTON");

	constructor(protected i18n: I18n) { }

	@HostListener("click")
	onRowClick() {
		if (this.enableSingleSelect && !this.showSelectionColumn) {
			this.onSelectionChange();
		}
	}

	onSelectionChange() {
		if (this.selected) {
			this.deselectRow.emit();
		} else {
			this.selectRow.emit();
		}
	}

	getCheckboxLabel(): Observable<string> {
		return this._checkboxLabel.subject;
	}

	getExpandButtonAriaLabel(): Observable<string> {
		return this._expandButtonAriaLabel.subject;
	}
}
