/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import {Amucretion} from "../../library/src/Amucretion";
import {UI4096} from "./ui";

window.onload = function () {
    const ac = new Amucretion();
    const ui = new UI4096("4096", "0.4.0", ac);
    ac.Initialize(ui, "4096");
    ac.Render();
};
