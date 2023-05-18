import ColumnElements from "../columnElements";
import "./style.css";

function BoardColumns({
    elem,
    column,
    dragStart,
    dragOver,
    dragEnter,
    dragLeave,
    dragDrop,
    dragEnd,
}) {
    return (
        <div className="BoardColumns">
            {elem.map((item, index) => (
                <ColumnElements
                    key={index}
                    item={item}
                    row={index}
                    column={column}
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
export default BoardColumns;
