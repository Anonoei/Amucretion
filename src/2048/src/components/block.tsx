/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import React from "react";

export function BlockComponent(props: any) {
    return (
        <div id={props.ID} className={props.Name}>
            {props.Value}
        </div>
    );
}
