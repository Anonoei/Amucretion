/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import {Logger, LogLevel} from "./logger";

import {UI} from "./ui";

export class Game {
    protected readonly name: string = "undefined";
    protected readonly version: string = "undefined";
    protected readonly log: Logger;
    protected refresh: CallableFunction = function () {};

    public constructor(
        name: string,
        version: string,
        ui: UI,
        level: LogLevel = LogLevel.Trace
    ) {
        this.name = name;
        this.version = version;
        this.log = new Logger(`Amucretion.${this.name}.Game`, level);
        this.refresh = function () {
            ui.Refresh();
        }.bind(ui);
    }

    public get Get(): Game {
        return this;
    }

    public get Name(): string {
        return this.name;
    }

    public get Version(): string {
        return this.version;
    }

    public Initialize() {}
    public Runtime() {}
    public Shutdown() {}
}
