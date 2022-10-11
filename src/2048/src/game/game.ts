/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import {Game} from "../../../library/src/game";

import {Action} from "./action";
import {Turn} from "./turn";
import {Board} from "./board";
import {Logic} from "./logic";
import {History2048} from "./history";

export class Game2048 extends Game {
    protected readonly board: Board;
    protected readonly logic: Logic;
    protected readonly history: History2048;

    protected uiBoard: JSX.Element | null = null;
    protected rows: Array<JSX.Element> = [];
    protected score = 0;
    protected turn: Turn = new Turn();
    protected turnValid = false;
    protected largestBlock = 0;

    public constructor(name: string, version: string, ui: any) {
        super(name, version, ui);
        this.board = new Board();
        this.history = new History2048();
        this.logic = new Logic(this.board);
    }

    public override Initialize() {
        this.log.debug("Initializing...");
        this.board.Initialize(4, 4);
        this.logic.NewBlock(this.turn);
        this.history.Initialize(this.turn);
        this.turn = new Turn();
    }

    public override Shutdown() {
        console.log("Shutting down...");
    }

    public get TurnCount(): number {
        return this.history.TurnCount;
    }

    public get Score(): number {
        return this.score;
    }

    public get LargestBlock(): number {
        return this.largestBlock;
    }

    public get Board(): Board {
        return this.board;
    }

    public Flow(action: Action): void {
        const turn = this.Turn(action);
        if (turn && !(action == Action.Undo || action == Action.Redo)) {
            if (this.Merge(action)) {
            }
            if (this.Move(action)) {
            }
            this.Spawn(action);
        } else if (!turn) {
            if (action == Action.Undo) {
                this.Spawn(action);
                if (this.Move(action)) {
                }
                if (this.Merge(action)) {
                }
            } else if (action == Action.Redo) {
                if (this.Merge(action)) {
                }
                if (this.Move(action)) {
                }
                this.Spawn(action);
            }
        }
        this.CheckLargest();
        this.refresh();
    }

    public Turn(action: Action): boolean {
        if (action == Action.Undo) {
            if (this.Undo()) return false;
        } else if (action == Action.Redo) {
            if (this.Redo()) return false;
        }
        return true;
    }

    public Undo() {
        const h = this.history.Undo();
        if (h == false) {
            this.turn = new Turn();
            return false;
        }
        this.turn = h as Turn;
        return true;
    }

    public Redo() {
        const h = this.history.Redo();
        if (h == false) {
            this.turn = new Turn();
            return false;
        }
        this.turn = h as Turn;
        return true;
    }

    public Merge(action: Action) {
        if (this.turn.Action !== Action.Null) {
            if (action == Action.Undo) {
                if (this.turn.Merges.length == 0) {
                    this.turn = new Turn();
                    return false;
                }
                for (let i = this.turn.Merges.length - 1; i >= 0; i--) {
                    const value = (this.turn.Merge(i)["Val"] as number) / 2;
                    this.board.SetVal(
                        this.turn.Merge(i)["X1"] as number,
                        this.turn.Merge(i)["Y1"] as number,
                        value
                    );
                    this.board.SetVal(
                        this.turn.Merge(i)["X2"] as number,
                        this.turn.Merge(i)["Y2"] as number,
                        value
                    );
                    this.score -= value;
                    if (value * 2 == this.largestBlock)
                        this.largestBlock = value;
                }
                this.turn = new Turn();
                return true;
            } else if (action == Action.Redo) {
                if (this.turn.Merges.length == 0) return false;
                for (let i = 0; i < this.turn.Merges.length; i++) {
                    const value = this.turn.Merge(i)["Val"];
                    this.board.SetVal(
                        this.turn.Merge(i)["X2"] as number,
                        this.turn.Merge(i)["Y2"] as number
                    );
                    this.board.SetVal(
                        this.turn.Merge(i)["X1"] as number,
                        this.turn.Merge(i)["Y1"] as number,
                        value
                    );
                    this.score += (value as number) / 2;
                    if (value == this.largestBlock) this.largestBlock /= 2;
                }
                return true;
            } else {
                throw new Error("Turn on merge is invalid!");
            }
        }
        this.turn = new Turn();
        this.turn.Action = action;
        this.logic.Merge(this.turn);
        if (this.turn.Merges.length == 0) return false;
        //console.log("Merges", merges);
        this.turnValid = true;
        return true;
    }

    public Move(action: Action) {
        if (this.turn == null) throw new Error("Turn is null on move!");
        if (action == Action.Undo) {
            if (this.turn.Moves.length == 0) return false;
            for (let i = this.turn.Moves.length - 1; i >= 0; i--) {
                const value = this.turn.Move(i)["Val"];
                this.board.SetVal(
                    this.turn.Move(i)["X2"] as number,
                    this.turn.Move(i)["Y2"] as number
                );
                this.board.SetVal(
                    this.turn.Move(i)["X1"] as number,
                    this.turn.Move(i)["Y1"] as number,
                    value
                );
            }
            return true;
        } else if (action == Action.Redo) {
            if (this.turn.Moves.length == 0) return false;
            for (let i = 0; i < this.turn.Moves.length; i++) {
                const value = this.turn.Move(i)["Val"];
                this.board.SetVal(
                    this.turn.Move(i)["X1"] as number,
                    this.turn.Move(i)["Y1"] as number
                );
                this.board.SetVal(
                    this.turn.Move(i)["X2"] as number,
                    this.turn.Move(i)["Y2"] as number,
                    value
                );
            }
            return true;
        }
        this.logic.Move(this.turn);
        if (this.turn.Moves.length == 0) return false;
        //console.log("Moves", moves);
        this.turnValid = true;
        return true;
    }

    public Spawn(action: Action) {
        if (this.turn.Action == Action.Null) {
            if (action == Action.Undo) {
                for (let i = this.turn.Spawns.length - 1; i >= 0; i--)
                    this.board.SetVal(
                        this.turn.Spawn(i)["X"],
                        this.turn.Spawn(i)["Y"]
                    );
                return;
            } else if ((action = Action.Redo)) {
                for (let i = 0; i < this.turn.Spawns.length; i++)
                    this.board.SetVal(
                        this.turn.Spawn(i)["X"],
                        this.turn.Spawn(i)["Y"],
                        this.turn.Spawn(i)["Val"]
                    );
                this.turn = new Turn();
                return;
            } else {
                throw new Error("You must merge and move before spawning!");
            }
        }
        if (!this.turnValid) {
            this.turn = new Turn();
            this.turnValid = false;
            this.IsGameOver();
            return;
        }
        this.logic.NewBlock(this.turn);
        this.history.AddTurn(this.turn, this.board.Get);
        this.turn = new Turn();
        this.turnValid = false;
    }

    public IsGameOver() {
        let gameOver = true;
        for (let y = 0; y < this.board.Height; y++) {
            if (this.board.GetCol(y).includes(this.board.Blank))
                gameOver = false;
        }
        if (gameOver) console.error("Game over!");
        return gameOver;
    }

    public CheckLargest() {
        for (let y = 0; y < this.board.Height; y++) {
            for (let x = 0; x < this.board.Width; x++) {
                const val = this.board.GetVal(x, y);
                if (val != this.board.Blank && val > this.largestBlock)
                    this.largestBlock = val as number;
            }
        }
    }
}
