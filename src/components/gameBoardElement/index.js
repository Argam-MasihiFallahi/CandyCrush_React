import { useState } from "react";
import "./style.css";
import BoardColumns from "../BoardColumns";

function GameBoardElement() {
    const rows = 9;
    const columns = 9;

    const [prevCandy, setPrevCandy] = useState(undefined);
    const [currCandy, setCurrCandy] = useState(undefined);

    let vertical;
    let horizontal;

    const candies = ["Blue", "Red", "Yellow", "Purple", "Green", "Orange"];

    const [matrix, setMatrix] = useState(() => {
        const gameData = [];
        for (let i = 0; i < columns; i++) {
            const matrixColumn = [];
            for (let j = 0; j < rows; j++) {
                matrixColumn.push({
                    type: candies[Math.floor(Math.random() * candies.length)],
                });
            }
            gameData.push(matrixColumn);
        }
        return gameData;
    });
    function matrixHandler() {
        const newMatrix = JSON.parse(JSON.stringify(matrix));

        let currCandyType = currCandy.type;
        let prevCandyType = prevCandy.type;

        newMatrix[currCandy.column][currCandy.row].type = prevCandyType;
        newMatrix[prevCandy.column][prevCandy.row].type = currCandyType;
        setCurrCandy({
            column: currCandy.column,
            row: currCandy.row,
            type: prevCandy.type,
        });
        setPrevCandy({
            column: prevCandy.column,
            row: prevCandy.row,
            type: currCandy.type,
        });

        // setPrevCandy(seter(currCandy, prevCandyType));
        // setCurrCandy(seter(prevCandy, currCandyType));

        return { curr: currCandy, prev: prevCandy, matrix: newMatrix };
    }

    function dragStart(item) {
        setCurrCandy(item);
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
    }

    function dragLeave() {
        //
    }

    function dragDrop(item) {
        setPrevCandy(item);
    }

    function dragEnd() {
        if (currCandy.type === prevCandy.type) return;
        let currCoord = currCandy;
        let prevCoord = prevCandy;
        let row = currCoord.row;
        let column = currCoord.column;
        let row2 = prevCoord.row;
        let column2 = prevCoord.column;
        let left = column2 === column - 1 && row === row2;
        let right = column2 === column + 1 && row === row2;
        let up = row2 === row - 1 && column2 === column;
        let down = row2 === row + 1 && column2 === column;
        let isMovement = left || right || up || down;

        if (isMovement) {
            let cloneMatrix = matrixHandler();
            setMatrix(cloneMatrix.matrix);
            calcSameCandies(cloneMatrix.prev, cloneMatrix.matrix);
        }
    }
    function calcSameCandies(arg, matrix) {
        let argCoord = {
            column: arg.column,
            row: arg.row,
            type: matrix[arg.column][arg.row].type,
        };
        vertical = []; //verev-nerqev
        horizontal = []; // <= -- =>

        horizontal.push({
            column: argCoord.column,
            row: argCoord.row,
            type: argCoord.type,
        });

        vertical.push({
            column: argCoord.column,
            row: argCoord.row,
            type: argCoord.type,
        });

        // top candies check
        let i = argCoord.column;
        let j = argCoord.row - 1;
        while (j >= 0) {
            if (matrix[i][j].type === argCoord.type) {
                vertical.unshift({
                    column: i,
                    row: j,
                    type: matrix[i][j].type,
                });
                j--;
            } else break;
        }
        // bottom candies check
        let j1 = argCoord.row + 1;
        while (j1 < matrix[i].length) {
            if (matrix[i][j1].type === argCoord.type) {
                vertical.push({ column: i, row: j1, type: matrix[i][j1].type });
                j1++;
            } else break;
        }
        //left candies check
        let i2 = argCoord.column - 1;
        let j2 = argCoord.row;
        while (i2 >= 0) {
            if (matrix[i2][j2].type === argCoord.type) {
                horizontal.unshift({
                    column: i2,
                    row: j2,
                    type: matrix[i2][j2].type,
                });
                i2--;
            } else {
                break;
            }
        }
        //right candies check
        let i3 = argCoord.column + 1;
        while (i2 < matrix.length) {
            if (matrix[i3][j2].type === argCoord.type) {
                horizontal.push({
                    column: i3,
                    row: j2,
                    type: matrix[i3][j2].type,
                });
                i3++;
            } else {
                break;
            }
        }
        if (vertical.length < 3 && horizontal.length < 3) {
            setMatrix(() => {
                const newMatrix = JSON.parse(JSON.stringify(matrix));

                let currCandyType = currCandy.type;
                let prevCandyType = prevCandy.type;

                newMatrix[currCandy.column][currCandy.row].type = currCandyType;
                newMatrix[prevCandy.column][prevCandy.row].type = prevCandyType;

                setCurrCandy({
                    column: currCandy.column,
                    row: currCandy.row,
                    type: currCandy.type,
                });
                setPrevCandy({
                    column: prevCandy.column,
                    row: prevCandy.row,
                    type: prevCandy.type,
                });
                return newMatrix;
            });
        }
        else {
            candyCrush(arg, matrix)
        }
    }


    function candyCrush(arg, matrix) {
        let matrixClone = JSON.parse(JSON.stringify(matrix));
        for (let i = 0; i < horizontal.length; i++) {
            if (horizontal.length > 2) {
                matrixClone[horizontal[i].column].splice(
                    [horizontal[i].row],
                    1
                );
            }
        }

        if (vertical.length > 2) {
            matrixClone[vertical[0].column].splice(
                [vertical[0].row],
                vertical.length
            );
        }

        generateNewCandies(matrixClone);
    }
    function generateNewCandies(matrixClone) {
        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                let color_src =
                    candies[Math.floor(Math.random() * candies.length)];
                if (matrixClone[i].length < columns) {
                    matrixClone[i].unshift({
                    
                        type: color_src,
                    });
                }
            }
        }
        setMatrix(matrixClone)
    }

    return (
        <div className="GameBoardElement">
            {matrix.map((elem, index) => (
                <BoardColumns
                    key={index}
                    elem={elem}
                    column={index}
                    dragStart={dragStart}
                    dragOver={dragOver}
                    dragEnter={dragEnter}
                    dragLeave={dragLeave}
                    dragDrop={dragDrop}
                    dragEnd={dragEnd}
                />
            ))}
        </div>
    );
}

export default GameBoardElement;
