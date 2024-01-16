import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Todo from "./Todo";

describe("Todo Component", () => {
  const sampleTodo = {
    text: "Sample Todo",
    done: false,
  };

  it("renders Todo component with not done info", () => {
    render(<Todo todo={sampleTodo} onClickDelete={() => {}} onClickComplete={() => {}} />);

    expect(screen.getByText("This todo is not done")).toBeInTheDocument();
    expect(screen.getByText("Sample Todo")).toBeInTheDocument();
  });

  it("renders Todo component with done info", () => {
    const doneTodo = {
      ...sampleTodo,
      done: true,
    };

    render(<Todo todo={doneTodo} onClickDelete={() => {}} onClickComplete={() => {}} />);

    expect(screen.getByText("This todo is done")).toBeInTheDocument();
    expect(screen.getByText("Sample Todo")).toBeInTheDocument();
  });

  it("calls onClickDelete when delete button is clicked", () => {
    const onClickDelete = jest.fn();

    render(<Todo todo={sampleTodo} onClickDelete={onClickDelete} onClickComplete={() => {}} />);

    fireEvent.click(screen.getByText("Delete"));
    expect(onClickDelete).toHaveBeenCalled();
  });

  it("calls onClickComplete when Set as done button is clicked", () => {
    const onClickComplete = jest.fn();

    render(<Todo todo={sampleTodo} onClickDelete={() => {}} onClickComplete={onClickComplete} />);

    fireEvent.click(screen.getByText("Set as done"));
    expect(onClickComplete).toHaveBeenCalled();
  });
});
