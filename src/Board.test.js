import React from "react";
import {render, fireEvent} from "@testing-library/react";
import Board from "./Board";


it("renders without crashing", ()=>{
    render(<Board nrows={5} ncols={5} chanceLightStartsOn={1}/>)
});

it("matches the snapshot", ()=>{
    const {asFragment} = render(<Board nrows={5} ncols={5} chanceLightStartsOn={1}/>);
    expect(asFragment()).toMatchSnapshot();
});

it("renders a full board of lit cells", ()=>{
    const {queryAllByRole} = render(<Board nrows={5} ncols={5} chanceLightStartsOn={1}/>);
    const cells = queryAllByRole("button");
    expect(cells.length).toBe(25);
    cells.forEach((cell)=>{
        expect(cell).toHaveClass("Cell-lit");
    });
});

it("flips the cell and cells around it on click", ()=>{
    const {queryAllByRole} = render(<Board nrows={3} ncols={3} chanceLightStartsOn={1}/>)
    const cells = queryAllByRole("button");

    //click on the center cell of the 3x3 board
    fireEvent.click(cells[4]);

    //the center cells and the cells to the side,top and bottom should be unlit now
    const unlitCellsIdx = [1,3,4,5,7]

    unlitCellsIdx.forEach((index)=>{
        expect(cells[index]).not.toHaveClass("Cell-lit");
    });
});

it("renders the winning text", ()=>{
    const {queryByText} = render(<Board nrows={5} ncols={5} chanceLightStartsOn={0}/>)

    expect(queryByText("You have won!!")).toBeInTheDocument();
});

it("renders the winning text on click", ()=>{
    //generate a 1x3 board that can be won with one click
    const {queryByText,queryAllByRole} = render(<Board nrows={1} ncols={3} chanceLightStartsOn={1}/>)
    const cells = queryAllByRole("button");

    //click on the middle cell
    fireEvent.click(cells[1]);

    expect(queryByText("You have won!!")).toBeInTheDocument();
})
