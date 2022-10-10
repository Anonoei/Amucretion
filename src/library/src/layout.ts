/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import {Amucretion} from "./Amucretion";

export class Layout {
    protected ac: Amucretion;
    protected ctr: HTMLElement;
    protected style: HTMLElement;

    constructor(ac: Amucretion) {
        this.ac = ac;
        this.ctr = ac.Container;
        this.style = ac.Style;
    }

    public Initialize() {}
    public Resize() {}

    public get Ctr() {
        return this.ctr;
    }

    public get Style() {
        return this.style;
    }
}
