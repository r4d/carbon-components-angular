import {
	Component,
	Input,
	Optional,
	Output,
	EventEmitter
} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";

/**
 * `SideNavItem` can either be a child of `SideNav` or `SideNavMenu`
 */
@Component({
	selector: "ibm-sidenav-item",
	template: `
		<li [ngClass]="{
			'bx--side-nav__item': !isSubMenu,
			'bx--side-nav__menu-item': isSubMenu
		}"
		[attr.role]="(isSubMenu ? 'none' : null)">
			<a
				class="bx--side-nav__link"
				[href]="href"
				[attr.role]="(isSubMenu ? 'menuitem' : null)"
				[attr.aria-current]="(active ? 'page' : null)"
				(click)="navigate($event)">
				<div *ngIf="!isSubMenu" class="bx--side-nav__icon">
					<ng-content select="[icon]"></ng-content>
				</div>
				<span class="bx--side-nav__link-text">
					<ng-content></ng-content>
				</span>
			</a>
		</li>
	`
})
export class SideNavItem {
	/**
	 * Link for the item. NOTE: *do not* pass unsafe or untrusted values, this has the potential to open you up to XSS attacks
	 */
	@Input() set href(v: string) {
		this._href = v;
	}

	get href() {
		return this.domSanitizer.bypassSecurityTrustUrl(this._href) as string;
	}

	/**
	 * Toggles the active (current page) state for the link.
	 */
	@Input() active = false;

	/**
	 * Array of commands to send to the router when the link is activated
	 * See: https://angular.io/api/router/Router#navigate
	 */
	@Input() route: any[];

	/**
	 * Router options. Used in conjunction with `route`
	 * See: https://angular.io/api/router/Router#navigate
	 */
	@Input() routeExtras: any;

	/**
	 * Emits the navigation status promise when the link is activated
	 */
	@Output() navigation = new EventEmitter<Promise<boolean>>();

	isSubMenu = false;

	protected _href = "javascript:void(0)";

	constructor(protected domSanitizer: DomSanitizer, @Optional() protected router: Router) {}

	navigate(event) {
		if (this.router && this.route) {
			event.preventDefault();
			const status = this.router.navigate(this.route, this.routeExtras);
			this.navigation.emit(status);
		}
	}
}
