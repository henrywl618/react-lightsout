import React from "react";
import {render} from "@testing-library/react";
import Cell from "./Cell";
import Board from "./Board";

it("renders without crashing", function(){
    render(<Cell flipCellsAroundMe={Board.flipCellsAround} isLit={true} coord={"0-0"}/>)
});

it("matches the snapshot", function(){
    const {asFragment} = render(<Cell flipCellsAroundMe={Board.flipCellsAround} isLit={true} coord={"0-0"} />)
    expect(asFragment()).toMatchSnapshot();
});