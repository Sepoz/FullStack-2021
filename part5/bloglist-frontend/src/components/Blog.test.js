import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen } from "@testing-library/react";
import Blog from "./Blog";

const blog = {
    title: "blog1",
    author: "john",
    url: "www.blog1.com",
    likes: 200,
};

describe("testing <Blog /> functionality", () => {
    let component;

    beforeEach(() => {
        component = render(<Blog blog={blog} />);
    });

    test("renders content", () => {
        const div = component.container.querySelector(".blog");
        expect(div).toHaveTextContent("blog1 john");
    });
    test("renders title and author only", () => {
        const url = screen.queryByText("www.blog.com");
        const likes = screen.queryByText("200");

        expect(url).toBeNull();
        expect(likes).toBeNull();
    });
    test("renders content after button click", () => {
        const button = component.getByText("show");
        fireEvent.click(button);

        const div = component.container.querySelector(".blog-extended");
        expect(div).toHaveTextContent("blog1 johnwww.blog1.com200");
    });
});
