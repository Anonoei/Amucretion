/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import {Amucretion} from "../../library/src/Amucretion";
import {UIIndex} from "./ui";

window.onload = function () {
    const ac = new Amucretion();
    const ui = new UIIndex("Index", "0.2.0", ac)
    ac.Initialize(ui, "Index");
    ac.Render();
};
