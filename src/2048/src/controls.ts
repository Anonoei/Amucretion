/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import {Controls} from "../../library/src/controls";

import {Pos} from "../../library/src/size";

import {Game2048} from "./game/game";
import {Action} from "./game/action";

export class GameControls extends Controls {
    private mousePos: Pos | null = null;
    private touchPos: Pos | null = null;

    public mouseDownHandler: any = null;
    public mouseUpHandler: any = null;
    public touchStartHandler: any = null;
    public touchMoveHandler: any = null;
    public keyDownHandler: any = null;

    public constructor() {
        super();
        this.mouseDownHandler = function (e: any) {
            this.mousePos = new Pos(e.clientX, e.clientY);
        };
        this.mouseUpHandler = function (e: any) {
            if (this.mousePos == null) return;
            Controls2048.SubmitAction(
                Controls2048.CalcAction(
                    e.clientX - this.mousePos.X,
                    e.clientY - this.mousePos.Y,
                    20,
                    20
                )
            );
            this.mousePos = null;
        };
        this.touchStartHandler = function (e: any) {
            this.touchPos = new Pos(e.touches[0].clientX, e.touches[0].clientY);
        };
        this.touchMoveHandler = function (e: any) {
            if (this.touchPos == null) return;
            Controls2048.SubmitAction(
                Controls2048.CalcAction(
                    this.touchPos.X - e.touches[0].clientX,
                    this.touchPos.Y - e.touches[0].clientY,
                    -10,
                    -10
                )
            );
            this.touchPos = null;
            e.preventDefault();
        };
        this.keyDownHandler = function (e: any) {
            if (e.repeat == true) return;
            if (e.key == "w" || e.key == "ArrowUp")
                Controls2048.SubmitAction(Action.Up);
            else if (e.key == "s" || e.key == "ArrowDown")
                Controls2048.SubmitAction(Action.Down);
            else if (e.key == "a" || e.key == "ArrowLeft")
                Controls2048.SubmitAction(Action.Left);
            else if (e.key == "d" || e.key == "ArrowRight")
                Controls2048.SubmitAction(Action.Right);
            else if (e.key == "z" && e.ctrlKey)
                Controls2048.SubmitAction(Action.Undo);
            else if (
                (e.key == "y" && e.ctrlKey) ||
                (e.key == "z" && e.shiftKey)
            )
                Controls2048.SubmitAction(Action.Redo);
        };
    }

    public override Initialize(
        game: Game2048,
        enableKeys = true,
        enableMouse = true,
        enableTouch = true
    ) {
        super.Initialize(game, enableKeys, enableMouse, enableTouch);
        this.callback = function (action: Action) {
            game.Flow(action);
        }.bind(game);
        if (this.enableKeys)
            document.addEventListener("keydown", this.keyDownHandler, false);
        if (this.enableMouse) {
            document.addEventListener(
                "mousedown",
                this.mouseDownHandler,
                false
            );
            document.addEventListener("mouseup", this.mouseUpHandler, false);
        }
        if (this.enableTouch) {
            document.addEventListener(
                "touchstart",
                this.touchStartHandler,
                false
            );
            document.addEventListener(
                "touchmove",
                this.touchMoveHandler,
                false
            );
        }
    }

    private CalcAction(dX: number, dY: number, valX: number, valY: number) {
        if (Math.abs(dX) > Math.abs(dY)) {
            if (dX < -valX) return Action.Left;
            else if (dX > valX) return Action.Right;
        } else {
            if (dY < -valY) return Action.Up;
            else if (dY > valY) return Action.Down;
        }
        return null;
    }

    private SubmitAction(action: Action | null) {
        if (action === null) return;
        if (this.callback == null)
            throw new Error("Controls callback is null!");
        this.callback(action);
    }
}

export const Controls2048 = new GameControls();
