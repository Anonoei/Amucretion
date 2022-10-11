/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import {Amucretion} from "../../library/src/Amucretion";
import {UI2048} from "./ui";
//import {Controls2048} from "./controls";

window.onload = function () {
    const ac = new Amucretion();
    const ui = new UI2048("2048", "0.4.1", ac);
    ac.Initialize(ui, "2048");
    ac.Render();
};
