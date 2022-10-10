import {UI2048} from "../../2048/src/ui";

import {Game4096} from "./game";

export class UI4096 extends UI2048 {
    protected override game: Game4096 = new Game4096(this.name, this.version, this);
}