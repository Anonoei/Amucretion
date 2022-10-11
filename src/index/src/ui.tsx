/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import React from "react";

import {UI} from "../../library/src/ui";

import {GameIndex} from "./game/game";

export class UIIndex extends UI {
    protected override game: GameIndex = new GameIndex(
        this.name,
        this.version,
        this
    );

    public override Initialize() {
        this.game.Initialize();
        this.Refresh();
    }

    public override Render(): JSX.Element {
        return <div id="containerIndex"></div>;
    }

    public override Refresh() {
        this.render(this.Render());
    }
}
