import React from "react";

export function BlockComponent(props: any) {
    return (
        <div id={props.ID} className={props.Name}>
            {props.Value}
        </div>
    );
}
