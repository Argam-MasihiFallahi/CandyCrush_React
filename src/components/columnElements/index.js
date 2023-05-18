import "./style.css";

function ColumnElements({
    item,
    row,
    column,
    dragStart,
    dragOver,
    dragEnter,
    dragLeave,
    dragDrop,
    dragEnd,
}) {
    // console.log("column", column, "row", row);
    const images = {
        Blue: "../../images/Blue.png",
        Orange: "../../images/Orange.png",
        Green: "../../images/Green.png",
        Yellow: "../../images/Yellow.png",
        Red: "../../images/Red.png",
        Purple: "../../images/Purple.png",
    };

    const onDrag = () => {
        dragDrop({ column: column, row: row, type: item.type });
    };

    const onStart = () => {
        dragStart({ column: column, row: row, type: item.type });
    };

    return (
        <div
            className="ColumnElements"
            onDragStart={onStart}
            onDragOver={dragOver}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            onDrop={onDrag}
            onDragEnd={dragEnd}
        >
            <img src={images[item.type]} alt="" />
        </div>
    );
}

export default ColumnElements;
