import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import { ProgressIndicator } from "./progress-indicator.component";
import { CommonModule } from "@angular/common";
import { DialogModule, ExperimentalModule } from "..";
import { CheckmarkOutline16Module } from "@carbon/icons-angular/lib/checkmark--outline/16";
import { Warning16Module } from "@carbon/icons-angular/lib/warning/16";

@Component({
	template: `<ibm-progress-indicator [steps]="steps" [current]="current"></ibm-progress-indicator>`
})
class ProgressIndicatorTest {
	steps = [
		{
			text: "First step",
			state: ["complete"],
			optionalText: "optional"
		},
		{
			text: "Second step",
			state: ["current"],
			tooltip: { content: "Overflow tooltip content.", trigger: "click", placement: "bottom" }
		},
		{
			text: "Third step",
			state: ["incomplete"],
			tooltip: {
				content: `Test`,
				trigger: "click",
				placement: "bottom"
			}
		},
		{
			text: "Fourth step",
			state: ["incomplete", "error"]
		},
		{
			text: "Fifth step",
			state: ["incomplete"],
			disabled: true
		}
	];

	current = 2;
}

describe("ProgressIndicator", () => {
	let fixture, element, wrapper;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				ProgressIndicator,
				ProgressIndicatorTest
			],
			imports: [
				CommonModule,
				DialogModule,
				ExperimentalModule,
				CheckmarkOutline16Module,
				Warning16Module
			]
		});
	});

	it("should work", () => {
		fixture = TestBed.createComponent(ProgressIndicator);
		expect(fixture.componentInstance instanceof ProgressIndicator).toBe(true);
	});

	it("should set current to 2 and set current step to Third step", () => {
		fixture = TestBed.createComponent(ProgressIndicatorTest);
		fixture.detectChanges();
		element = fixture.debugElement.query(By.css("ibm-progress-indicator"));
		expect(element.componentInstance.current).toBe(2);
		expect(element.nativeElement.querySelector(".bx--progress-step--current").textContent).toContain("Third step");
	});

	it("should set current step to Fourth step and set warning icon when step is in error state", () => {
		fixture = TestBed.createComponent(ProgressIndicatorTest);
		wrapper = fixture.componentInstance;
		wrapper.current = 3;
		fixture.detectChanges();
		element = fixture.debugElement.query(By.css("ibm-progress-indicator"));
		expect(element.nativeElement.querySelector(".bx--progress-step--current").textContent).toContain("Fourth step");
		expect(element.nativeElement.querySelector(".bx--progress__warning")).toBeTruthy();
	});

	it("should expand the tooltip when tooltip trigger is clicked", () => {
		fixture = TestBed.createComponent(ProgressIndicatorTest);
		wrapper = fixture.componentInstance;
		wrapper.current = 2;
		fixture.detectChanges();
		element = fixture.debugElement.query(By.css("ibm-progress-indicator"));
		let tooltipTrigger = element.nativeElement.querySelector(".bx--progress-step--current .bx--tooltip__trigger");
		tooltipTrigger.click();
		fixture.detectChanges();
		expect(tooltipTrigger.getAttribute("aria-expanded")).toEqual("true");
		expect(element.nativeElement.querySelector("ibm-tooltip").textContent).toContain("Test");
	});
});
