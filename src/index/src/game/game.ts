/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import {Game} from "../../../library/src/game";

export class GameIndex extends Game {
    protected games: Array<string> = [
        "2048", "4096"
    ]
    public constructor(name: string, version: string, ui: any) {
        super(name, version, ui);
    }

    public override Initialize() {

    }

    public override Shutdown() {
        
    }
}
/*
class Index
{

    Initialize()
    {
        this.Container = dvGames.GetContainer();
        this.Container.innerHTML = `
<div id="indexHeader" class="indexHeader" style="width: 100%"></div>
<div id="indexBody" class="indexBody" style="width: 100%; height: 100%;"></div>`
        this.ContainerHeader = document.getElementById("indexHeader");
        this.ContainerBody = document.getElementById("indexBody");
        this.DisplayHeader();
        this.DisplayBody();
    }

    DisplayHeader()
    {
        this.ContainerHeader.textContent = "Total games: " + this.games.length
    }

    DisplayBody()
    {
        let html = '<div id="indexContainer" class="indexContainer" style="width: 100%; height: 100%;"></div>';
        this.ContainerBody.innerHTML = html;
        this.indexContainer = document.getElementById("indexContainer");
        this.indexContainer.style.position = "relative";
        this.indexContainer.style.display = "inline-flex";
        this.indexContainer.style.justifyContent = "flex-start";
        this.indexContainer.style.alignItems = "center";
        this.indexContainer.style.flexDirection = "column";
        this.indexContainer.style.flexWrap = "wrap";
        html = "";
        let ids = [];
        for (let i = 0; i < this.games.length; i++)
        {
            let id = "indexGame_" + this.games[i];
            html += '<div id="' + id + '" class="' + id + '">\n';
            html += '<a href="../' + this.games[i] + dvGames.file + '" target="_blank" rel="noopener noreferrer">' + this.games[i] + '</a>\n'
            html += '</div>';
            ids.push(id);
        }
        this.indexContainer.innerHTML = html;
        for (let i = 0; i < ids.length; i++)
        {
            let game = document.getElementById(ids[i]);
            game.style.position = "relative";
            game.style.display = "inline-flex";
            game.style.justifyContent = "center";
            game.style.alignItems = "center";
            game.style.border = "1px solid var(--dvGame_separator)"
            game.style.width = "100%";
        }
    }
}
*/
