/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import {Board} from "./board";

import {Action} from "./action";
import {Turn} from "./turn";

export class Logic {
    private readonly board: Board;
    constructor(board: Board) {
        this.board = board;
    }
    public Merge(turn: Turn) {
        if (turn.Action == Action.Left || turn.Action == Action.Right)
            this._MergeHorizontal(turn);
        else if (turn.Action == Action.Up || turn.Action == Action.Down)
            this._MergeVertical(turn);
        else throw new Error(`Invalid merge action: ${turn.Action}`);
        return;
    }

    public Move(turn: Turn) {
        if (turn.Action == Action.Left || turn.Action == Action.Right)
            this._MoveHorizontal(turn);
        else if (turn.Action == Action.Up || turn.Action == Action.Down)
            this._MoveVertical(turn);
        else throw new Error(`Invalid move action: ${turn.Action}`);
        return;
    }

    private _MergeHorizontal(turn: Turn): void {
        let reverse = false;
        if (turn.Action) reverse = true;
        for (let y = 0; y < this.board.Height; y++) {
            for (let cX = 0; cX < this.board.Width; cX++) {
                let x = cX;
                if (reverse) x = this.board.Width - 1 - x;
                if (this.board.GetVal(x, y) == this.board.Blank) continue;
                let mX = null;
                for (let cdX = cX; cdX < this.board.Width; cdX++) {
                    let dX = cdX + 1;
                    if (reverse) dX = this.board.Width - 1 - dX;
                    if (dX == x || dX == this.board.Width || dX == -1) break;
                    if (this.board.GetVal(dX, y) == this.board.Blank) continue;
                    else if (
                        this.board.GetVal(x, y) == this.board.GetVal(dX, y)
                    ) {
                        mX = dX;
                        break;
                    } else break;
                }
                if (mX != null) {
                    const value = this.board.GetVal(mX, y) * 2;
                    turn.AddMerge(mX, y, x, y, value);
                    this.board.SetVal(mX, y);
                    this.board.SetVal(x, y, value);
                }
            }
        }
    }

    private _MergeVertical(turn: Turn): void {
        let reverse = false;
        if (turn.Action == Action.Down) reverse = true;
        for (let x = 0; x < this.board.Width; x++) {
            for (let cY = 0; cY < this.board.Height; cY++) {
                let y = cY;
                if (reverse) y = this.board.Height - 1 - y;
                if (this.board.GetVal(x, y) == this.board.Blank) continue;
                let mY = null;
                for (let cdY = cY; cdY < this.board.Height; cdY++) {
                    let dY = cdY + 1;
                    if (reverse) dY = this.board.Height - 1 - dY;
                    if (dY == y || dY == this.board.Height || dY == -1) break;
                    if (this.board.GetVal(x, dY) == this.board.Blank) continue;
                    else if (
                        this.board.GetVal(x, y) == this.board.GetVal(x, dY)
                    ) {
                        mY = dY;
                        break;
                    } else break;
                }
                if (mY != null) {
                    const value = this.board.GetVal(x, mY) * 2;
                    turn.AddMove(x, mY, x, y, value);
                    this.board.SetVal(x, mY);
                    this.board.SetVal(x, y, value);
                }
            }
        }
    }

    private _MoveHorizontal(turn: Turn): void {
        let reverse = false;
        if (turn.Action == Action.Right) reverse = true;
        for (let y = 0; y < this.board.Height; y++) {
            for (let cX = 0; cX < this.board.Width; cX++) {
                let x = cX;
                if (reverse) x = this.board.Width - 1 - x;
                if (this.board.GetVal(x, y) == this.board.Blank) continue;
                let mX = null;
                for (let cdX = 0; cdX < this.board.Width; cdX++) {
                    let dX = cdX + 1;
                    if (!reverse) dX = this.board.Width - 1 - dX;
                    //console.log("Checking Y", y, "/ X", x, "dX", dX);
                    if (
                        dX == this.board.Width ||
                        dX == -1 ||
                        (reverse && dX <= x) ||
                        (!reverse && dX >= x)
                    )
                        continue;
                    if (this.board.GetVal(dX, y) != this.board.Blank) break;
                    mX = dX;
                }
                if (mX != null) {
                    const value = this.board.GetVal(x, y);
                    turn.AddMove(x, y, mX, y, value);
                    this.board.SetVal(x, y);
                    this.board.SetVal(mX, y, value);
                }
            }
        }
    }

    private _MoveVertical(turn: Turn): void {
        let reverse = false;
        if (turn.Action == Action.Down) reverse = true;
        for (let x = 0; x < this.board.Width; x++) {
            for (let cY = 0; cY < this.board.Height; cY++) {
                let y = cY;
                if (reverse) y = this.board.Height - 1 - y;
                if (this.board.GetVal(x, y) == this.board.Blank) continue;
                let mY = null;
                for (let cdY = 0; cdY < this.board.Height; cdY++) {
                    let dY = cdY + 1;
                    if (!reverse) dY = this.board.Height - 1 - dY;
                    if (
                        dY == this.board.Height ||
                        dY == -1 ||
                        (reverse && dY <= y) ||
                        (!reverse && dY >= y)
                    )
                        continue;
                    //console.log("Checking X", x, "/ Y", y, "dY", dY);
                    if (this.board.GetVal(x, dY) != this.board.Blank) break;
                    mY = dY;
                }
                if (mY != null) {
                    const value = this.board.GetVal(x, y);
                    turn.AddMove(x, y, x, mY, value);
                    this.board.SetVal(x, y);
                    this.board.SetVal(x, mY, value);
                }
            }
        }
    }

    public NewBlock(turn: Turn): void {
        let y = -1;
        let x = -1;
        const yAttempts: Array<number> = [];
        const xAttempts: Array<number> = [];
        while (yAttempts.length < this.board.Height) {
            y = parseInt(Math.random() * 100, 10) % this.board.Height;
            if (this.board.GetCol(y).includes(this.board.Blank)) break;
            if (!yAttempts.includes(y)) yAttempts.push(y);
        }
        while (xAttempts.length < this.board.Width) {
            x = parseInt(Math.random() * 100, 10) % this.board.Height;
            if (this.board.GetVal(x, y) == this.board.Blank) break;
            if (!xAttempts.includes(x)) xAttempts.push(x);
        }
        if (
            x < 0 ||
            x >= this.board.Width ||
            y < 0 ||
            y > this.board.Height ||
            this.board.GetVal(x, y) != this.board.Blank
        )
            return;
        const value = this._NewValue;
        //console.log("Creating new block at (" + x + ", " + y + ") with value " + value);
        this.board.SetVal(x, y, value);
        turn.AddSpawn(x, y, value);
    }

    private get _NewValue(): number {
        return 2;
    }
}
