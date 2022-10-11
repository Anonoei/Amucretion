/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import React from "react";

import {BlockComponent} from "./block";

export function CellComponent(props: any) {
    return (
        <div id={props.ID} className="BoardCell" style={{width: props.Width}}>
            <BlockComponent
                ID={props.BlockID}
                Name={props.BlockName}
                Value={props.Value}
            />
        </div>
    );
}
