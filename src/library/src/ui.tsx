/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/
//import { Game } from "./game";
import React from "react";

import {Logger, LogLevel} from "./logger";

import {Game} from "./game";
import {Controls} from "./controls";

export class UI {
    protected readonly name: string = "undefined";
    protected readonly version: string = "undefined";
    protected readonly log: Logger;

    protected render: CallableFunction = function(){};
    protected game: Game = new Game(this.name, this.version, this);
    protected controls: Controls  = new Controls();

    public constructor(
        name: string,
        version: string,
        ac: any,
        level: LogLevel = LogLevel.Trace,
    ) {
        this.name = name;
        this.version = version;
        this.log = new Logger(`Amucretion.${this.name}.UI`, level);
        this.render = function() {
            ac.Render();
        }.bind(ac);
    }

    public get Name(): string {
        return this.name;
    }

    public get Version(): string {
        return this.version;
    }

    public Initialize() {
        this.log.trace("Initializing...");
        this.controls = new Controls();
        this.Refresh();
        this.controls.Initialize(this.game);
    }
    public Runtime() {{this.render(this.Render())}}
    public Render(): JSX.Element {return <p>undefined</p>}
    public Shutdown() {
        this.log.trace("Shutting down...");
    }

    public Refresh() {}
}
