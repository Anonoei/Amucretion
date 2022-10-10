/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import {Game2048} from "../../2048/src/game/game";

import {Action} from "../../2048/src/game/action";
import {Turn} from "../../2048/src/game/turn";

import {History4096} from "./history";

export class Game4096 extends Game2048 {
    protected override readonly history: History4096 | any;
    private sizes: Array<Array<number>> = [
        [16, 1, 0], // 3, 3
        [32, 1, 1], // 4, 4
        [128, 1, 1], // 5, 5
        [512, 1, 2], // 6, 7
    ];
    private sizeCounter = 0;

    public constructor(name: string, version: string, ui: any) {
        super(name, version, ui);
        this.history = new History4096();
    }

    public override Initialize() {
        this.log.debug("Initializing...");
        this.board.Initialize(2, 3);
        this.logic.NewBlock(this.turn);
        this.history.Initialize(this.turn);
        this.turn = new Turn();
    }

    public override Flow(action: Action): void {
        const turn = this.Turn(action);
        if (turn && !(action == Action.Undo || action == Action.Redo)) {
            if (this.Merge(action)) {
            }
            if (this.Move(action)) {
            }
            this.Spawn(action);
            this.CheckSize(true);
        } else if (!turn) {
            if (action == Action.Undo) {
                this.Spawn(action);
                if (this.Move(action)) {
                }
                if (this.Merge(action)) {
                }
                this.CheckSize(false);
            } else if (action == Action.Redo) {
                if (this.Merge(action)) {
                }
                if (this.Move(action)) {
                }
                this.Spawn(action);
                this.CheckSize(true);
            }
        }
        this.refresh();
    }

    public CheckSize(larger: boolean): void {
        this.CheckLargest();
        if (this.sizeCounter >= this.sizes.length) return;
        if (larger) {
            if (this.largestBlock == this.sizes[this.sizeCounter][0])
                this.UpdateBoard(
                    this.sizes[this.sizeCounter][1],
                    this.sizes[this.sizeCounter][2]
                );
        } else {
            if (this.largestBlock == this.sizes[this.sizeCounter][0] / 2)
                this.UpdateBoard(
                    -this.sizes[this.sizeCounter][1],
                    -this.sizes[this.sizeCounter][2]
                );
        }
    }

    public UpdateBoard(x: number, y: number): void {
        if (x >= 0 && y >= 0) this.sizeCounter += 1;
        else if (x <= 0 && y <= 0) this.sizeCounter -= 1;
        this.board.UpdateSize(x, y);
        this.refresh();
    }

    public override Spawn(action: Action) {
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
        for (let i = 0; i <= this.sizeCounter; i++)
            this.logic.NewBlock(this.turn);
        this.history.AddTurn(this.turn, this.board.Get);
        this.turn = new Turn();
        this.turnValid = false;
    }
}
