/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/

import {Game} from "./game";

export class Controls {
    protected enableKeys = true;
    protected enableMouse = true;
    protected enableTouch = true;
    protected callback: CallableFunction = function () {};

    public Initialize(
        game: Game,
        enableKeys = true,
        enableMouse = true,
        enableTouch = true
    ) {
        this.enableKeys = enableKeys;
        this.enableMouse = enableMouse;
        this.enableTouch = enableTouch;
    }
}
