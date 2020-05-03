import * as React from "react";
import { render, cleanup } from "@testing-library/react";
import { Left } from "../../Anchored";
import "@testing-library/jest-dom/extend-expect";
import { ViewPort } from "../../ViewPort";
import { commonPropsTests } from "../Common";

afterEach(cleanup);

commonPropsTests("Left", <Left size={50} />, {
	position: "absolute",
	left: "0px",
	top: "0px",
	right: "",
	bottom: "0px",
	width: "50px",
	height: "",
});

test("Left stacked has correct styles", async () => {
	const { container } = render(
		<ViewPort>
			<Left id="test" size={10} order={0} />
			<Left id="test1" size={10} order={1} />
		</ViewPort>,
	);
	const sut = container.querySelector("#test")!;
	const style = window.getComputedStyle(sut);

	expect(style.left).toBe("0px");
	expect(style.top).toBe("0px");
	expect(style.right).toBe("");
	expect(style.bottom).toBe("0px");
	expect(style.width).toBe("10px");
	expect(style.height).toBe("");

	const sut1 = container.querySelector("#test1")!;
	const style1 = window.getComputedStyle(sut1);

	expect(style1.left).toBe("calc(0px + 10px)");
	expect(style1.top).toBe("0px");
	expect(style1.right).toBe("");
	expect(style1.bottom).toBe("0px");
	expect(style1.width).toBe("10px");
	expect(style1.height).toBe("");
});

test("Left stacked reversed has correct styles", async () => {
	const { container } = render(
		<ViewPort>
			<Left id="test1" size={10} order={1} />
			<Left id="test" size={10} order={0} />
		</ViewPort>,
	);
	const sut = container.querySelector("#test")!;
	const style = window.getComputedStyle(sut);

	expect(style.left).toBe("0px");
	expect(style.top).toBe("0px");
	expect(style.right).toBe("");
	expect(style.bottom).toBe("0px");
	expect(style.width).toBe("10px");
	expect(style.height).toBe("");

	const sut1 = container.querySelector("#test1")!;
	const style1 = window.getComputedStyle(sut1);

	expect(style1.left).toBe("calc(0px + 10px)");
	expect(style1.top).toBe("0px");
	expect(style1.right).toBe("");
	expect(style1.bottom).toBe("0px");
	expect(style1.width).toBe("10px");
	expect(style1.height).toBe("");
});
