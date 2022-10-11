/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import React from "react";

export function BoardComponent(props: any) {
    return (
        <div id="BoardWrap">
            <div id="Board">{props.Rows.map((Row: JSX.Element) => Row)}</div>
        </div>
    );
}
