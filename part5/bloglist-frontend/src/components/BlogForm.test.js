import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";

describe("testing <BlogForm />", () => {
    test("form calls the event handler", () => {
        const mockAddBlog = jest.fn();

        const component = render(<BlogForm addBlog={mockAddBlog} />);

        const testTitle = component.container.querySelector("#title");
        const testAuthor = component.container.querySelector("#author");
        const testUrl = component.container.querySelector("#url");

        const form = component.container.querySelector("form");

        fireEvent.change(testTitle, {
            target: { value: "testTitle" },
        });

        fireEvent.change(testAuthor, {
            target: { value: "testAuthor" },
        });

        fireEvent.change(testUrl, {
            target: { value: "testUrl" },
        });

        fireEvent.submit(form);

        expect(mockAddBlog.mock.calls).toHaveLength(1);
        console.log(mockAddBlog.mock.calls);
    });
});
