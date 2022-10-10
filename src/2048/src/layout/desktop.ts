/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import {layout} from "./layout";

import {Board} from "../board";

export class Desktop extends layout {
    public override Initialize() {
        if (this.ctr == null) throw new Error("Game container is null!");
        this.ctr.innerHTML = `
<div id="2048Header" class="2048Header" style="width: 100%"></div>
<div id="2048Body" class="2048Body" style="width: 100%; height: 100%;"></div>`;

        this.ctrHeader = document.getElementById("2048Header");
        if (this.ctrHeader == null) throw new Error("game header is null!");
        this.ctrHeader.innerHTML = `
        <div id="2048Stats" class="2048Stats" style="height: 100%;">
            <div id="headerStatsColumn1" class="headerStats">
                <div id="headerStatsMoves", class="headerStats"></div>
                <div id="headerStatsScore", class="headerStats"></div>
            </div>
            <div id="headerStatsColumn2" class="headerStats">
                <div id="headerStatsLargest", class="headerStats"></div>
                <div id="headerStatsTBD", class="headerStats"></div>
            </div>
        </div>
        <div id="2048Settings" class="2048Settings" style="height: 100%;">
            <div id="headerSettingsColumn1" class="headerSettings">
                <div id="headerSettingsExport", class="headerSettings">
                    <input type="button", id="headerSettingsExportButton" value="Download"></div>
                </div>
                <div id="headerSettingsImport", class="headerSettings"></div>
            </div>
            <div id="headerSettingsColumn2" class="headerSettings">
                <div id="headerSettingsTBD", class="headerSettings"></div>
                <div id="headerSettingsTBD", class="headerSettings"></div>
            </div>
        </div>`;
        this.ctrHeader.style.justifyContent = "flex-start";
        this.ctrHeader.style.position = "relative";
        this.ctrHeader.style.display = "inline-flex";
        this.ctrHeader.style.flexWrap = "wrap";
        this.ctrStats = document.getElementById("2048Stats");
        this.stats["Moves"] = document.getElementById(
            "headerStatsMoves"
        ) as HTMLElement;
        this.stats["Score"] = document.getElementById(
            "headerStatsScore"
        ) as HTMLElement;
        this.stats["Largest"] = document.getElementById(
            "headerStatsLargest"
        ) as HTMLElement;
        this.ctrSettings = document.getElementById("2048Settings");
        /*document.getElementById("headerSettingsExportButton").addEventListener("click", function(){
            let data = History.Export();
            let filename = Game.name + ".json";
            Download(filename, data);
        }, false);*/

        this.ctrBody = document.getElementById("2048Body");
        if (this.ctrBody == null) throw new Error("game body is null!");
        this.ctrBody.style.display = "inline-flex";
        this.ctrBody.style.justifyContent = "center";
        this.ctrBody.style.alignItems = "flex-start";
        this.ctrBody.style.padding = "10px";
        this.ResetBoard();
    }

    public override Resize(board: Board) {
        if (this.ctrBoard == null) throw new Error("game board is null!");
        const bodySize = this.ac.ContainerSize;
        let boardSideY = -1;
        if (bodySize.X > bodySize.Y) boardSideY = bodySize.Y;
        else boardSideY = bodySize.X;
        const ratio = 1 / board.Height / (1 / board.Width);
        let boardSideX = boardSideY * ratio;
        boardSideY = parseInt(boardSideY * 0.8, 10);
        boardSideX = parseInt(boardSideX * 0.8, 10);
        //console.log("Ratio", ratio, "X", boardSideX, "Y", boardSideY);
        this.ctrBoard.style.width = `${boardSideX}px`;
        this.ctrBoard.style.height = `${boardSideY}px`;
    }

    public override ResetBoard() {
        if (this.ctrBody == null) throw new Error("Game body is null!");
        this.ctrBody.innerHTML =
            '<div id="2048Board" class="2048Board" style="width: 100%; height: 100%;"></div>';
        this.ctrBoard = document.getElementById("2048Board");
        if (this.ctrBoard == null) throw new Error("Game body is null!");
        this.ctrBoard.style.justifyContent = "center";
        this.ctrBoard.style.position = "relative";
        this.ctrBoard.style.display = "inline-flex";
        this.ctrBoard.style.flexWrap = "wrap";
    }
}
