/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import {Layout} from "../../../library/src/layout";

import {Dictionary} from "../../../library/src/types";
import {Board} from "../board";

export class layout extends Layout {
    protected settings = {};
    protected stats: Dictionary<HTMLElement | null> = {
        Moves: null,
        Score: null,
        Largest: null,
    };
    protected ctrHeader: HTMLElement | null = null;
    protected ctrStats: HTMLElement | null = null;
    protected ctrSettings: HTMLElement | null = null;
    protected ctrBody: HTMLElement | null = null;
    protected ctrBoard: HTMLElement | null = null;
    public ResetBoard() {}

    public get Stats() {
        return this.stats;
    }

    public get Settings() {
        return this.settings;
    }

    public override Resize(board: Board | void) {}

    public get CtrHeader() {
        return this.ctrHeader;
    }

    public get CtrBoard() {
        return this.ctrBoard;
    }

    public get CtrBody() {
        return this.ctrBody;
    }
}
