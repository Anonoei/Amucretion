/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import React from "react";

export function ItemComponent(props: any) {
    return (
        <div id={props.ID} className="HeaderItem">
            {props.Name}: {props.Value}
        </div>
    );
}
