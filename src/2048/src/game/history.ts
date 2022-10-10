/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/

import {Action} from "./action";
import {Turn} from "./turn";

export class History2048 {
    protected turns: Array<Turn> = [];
    protected board: Array<Array<number | string>> = [];
    protected position = 0;

    public constructor() {}

    public Initialize(turn: Turn) {
        if (this.position !== 0)
            throw new Error("History attempted to re-initialize!");
        turn.Action = Action.Init;
        this.turns.push(turn);
        this.position = 1;
    }

    public AddTurn(turn: Turn, board: Array<Array<number | string>>) {
        while (this.position < this.turns.length) this.turns.pop();
        this.turns.push(turn);
        this.position += 1;
        this.Board = board;
    }

    public get Latest() {
        return this.turns[this.position];
    }

    public get Turns() {
        return this.turns;
    }

    public get Board() {
        return this.board;
    }

    public get TotalTurns() {
        return this.turns.length - 1;
    }

    public get TurnCount() {
        return this.position - 1;
    }

    public Undo() {
        if (this.position <= 1) return false;
        return this.Turns[this.position];
    }

    public Redo() {
        if (this.position > this.TotalTurns) return false;
        this.position += 1;
        return this.turns[this.position - 1];
    }

    public Export() {
        return JSON.stringify({
            Turns: this.turns,
            Board: this.board,
        });
    }

    private set Board(board: Array<Array<number | string>>) {
        this.board = board;
    }

    public _Log() {
        for (let i = 1; i < this.position; i++) console.log(i, this.turns[i]);
    }
}
