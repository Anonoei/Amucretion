import React from "react";

export function BoardComponent(props: any) {
    return (
        <div id="BoardWrap">
            <div id="Board">
                {props.Rows.map((Row: JSX.Element) => (
                    Row
                ))}
            </div>
        </div>
    );
}
