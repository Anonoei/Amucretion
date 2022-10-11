/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import React from "react";

export function RowComponent(props: any) {
    return (
        <div id={props.ID} className="BoardRow" style={{height: props.Height}}>
            {props.Cells.map((Cell: JSX.Element) => Cell)}
        </div>
    );
}
