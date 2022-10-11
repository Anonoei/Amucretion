/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import React from "react";

import {UI} from "../../library/src/ui";

import {Game2048} from "./game/game";
import {Controls2048} from "./controls";

import {HeaderComponent} from "./components/header";
import {CellComponent} from "./components/cell";
import {RowComponent} from "./components/row";
import {BoardComponent} from "./components/board";

export class UI2048 extends UI {
    protected override game: Game2048 = new Game2048(
        this.name,
        this.version,
        this
    );
    protected uiBoard: JSX.Element | null = null;
    protected rows: Array<JSX.Element> = [];

    public override Initialize() {
        this.log.trace("Initializing...");
        this.game.Initialize();
        this.controls = Controls2048;
        this.controls.Initialize(this.game);
        this.Refresh();
    }

    public override Render(): JSX.Element {
        return (
            <div id="container2048">
                <HeaderComponent
                    Moves={this.game.TurnCount}
                    Score={this.game.Score}
                    Block={this.game.LargestBlock}
                />
                <BoardComponent Rows={this.rows} />
            </div>
        );
    }

    public override Refresh() {
        const yPercent = `${(1 / this.game.Board.Height) * 100}%`;
        const xPercent = `${(1 / this.game.Board.Width) * 100}%`;
        this.rows = [];
        for (let y = 0; y < this.game.Board.Height; y++) {
            const cells: Array<JSX.Element> = [];
            for (let x = 0; x < this.game.Board.Width; x++) {
                const cellID = `BoardCellY${y}_X${x}`;
                const blockID = `BoardBlockY${y}_X${x}`;
                let blockName = "BoardBlock BoardBlockVal";
                const value = this.game.Board.GetVal(x, y);
                if (value == this.game.Board.Blank) blockName += "Blank";
                else blockName += `${value}`;
                cells.push(
                    <CellComponent
                        key={cellID}
                        ID={cellID}
                        BlockID={blockID}
                        BlockName={blockName}
                        Value={value}
                        Width={xPercent}
                    />
                );
            }
            const rowID = `BoardRowY${y}`;
            this.rows.push(
                <RowComponent
                    key={rowID}
                    ID={rowID}
                    Cells={cells}
                    Height={yPercent}
                />
            );
        }
        this.render(this.Render());
    }
}
