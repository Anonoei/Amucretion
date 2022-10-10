import React from "react";

export function ItemComponent(props: any) {
    return (
        <div id={props.ID} className="HeaderItem">
            {props.Name}: {props.Value}
        </div>
    );
}
