/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import {Dictionary} from "../../../library/src/types";

import {Action} from "./action";

export class Turn {
    private action: Action = Action.Null;
    private merges: Array<Dictionary<number | string>> = [];
    private moves: Array<Dictionary<number | string>> = [];
    private spawns: Array<Dictionary<number>> = [];

    public get Action() {
        return this.action;
    }

    public get Merges() {
        return this.merges;
    }

    public Merge(index: number) {
        return this.merges[index];
    }

    public get Moves() {
        return this.moves;
    }

    public Move(index: number) {
        return this.moves[index];
    }

    public get Spawns() {
        return this.spawns;
    }

    public Spawn(index: number) {
        return this.spawns[index];
    }

    public set Action(action: Action) {
        this.action = action;
    }

    public AddMerge(
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        value: number | string
    ): void {
        this.merges.push({
            X1: x1,
            Y1: y1,
            X2: x2,
            Y2: y2,
            Val: value,
        });
    }

    public set SetMerges(merges: Array<Dictionary<number | string>>) {
        this.merges = merges;
    }

    public SetMerge(index: number, merge: Dictionary<number | string>) {
        this.merges[index] = merge;
    }

    public AddMove(
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        value: number | string
    ): void {
        this.moves.push({
            X1: x1,
            Y1: y1,
            X2: x2,
            Y2: y2,
            Val: value,
        });
    }

    public set SetMoves(moves: Array<Dictionary<number | string>>) {
        this.moves = moves;
    }

    public SetMove(index: number, move: Dictionary<number | string>) {
        this.moves[index] = move;
    }

    public AddSpawn(x: number, y: number, value: number): void {
        this.spawns.push({
            X: x,
            Y: y,
            Val: value,
        });
    }

    public set Spawns(spawns: Array<Dictionary<number>>) {
        this.spawns = spawns;
    }

    public get Turn(): Dictionary<
        Action | Array<Dictionary<number | string>> | Array<Dictionary<number>>
    > {
        return {
            Action: this.action,
            Moves: this.moves,
            Merges: this.merges,
            Spawns: this.spawns,
        };
    }
}
