/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import React from "react";

import {ItemComponent} from "./item";

export function HeaderComponent(props: any) {
    return (
        <div id="Header2048">
            <div id="Stats2048">
                <div id="StatsColumn1" className="HeaderColumn">
                    <ItemComponent
                        ID="statsMoves"
                        Name="Moves"
                        Value={props.Moves}
                    />
                    <ItemComponent
                        ID="statsScore"
                        Name="Score"
                        Value={props.Score}
                    />
                </div>
                <div id="StatsColumn2" className="HeaderColumn">
                    <ItemComponent
                        ID="statsBlock"
                        Name="Block"
                        Value={props.Block}
                    />
                </div>
            </div>
            <div id="Settings2048"></div>
        </div>
    );
}
