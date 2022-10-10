import React from "react";

export function RowComponent(props: any) {
    return (
        <div id={props.ID} className="BoardRow" style={{height: props.Height}}>
            {props.Cells.map((Cell: JSX.Element) => (
                Cell
            ))}
        </div>
    );
}
