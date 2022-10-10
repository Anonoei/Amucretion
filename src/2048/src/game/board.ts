/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/
export class Board {
    private board: Array<Array<number | string>>;
    private height: number;
    private width: number;
    public blank: string;

    public constructor() {
        this.board = [];
        this.height = 0;
        this.width = 0;
        this.blank = " ";
    }

    public get Get(): Array<Array<number | string>> {
        return this.board;
    }

    public GetCol(y: number): Array<number | string> {
        return this.Get[y];
    }
    public GetVal(x: number, y: number): number | string {
        return this.GetCol(y)[x];
    }

    public get Width(): number {
        return this.width;
    }

    public get Height(): number {
        return this.height;
    }

    public get Blank(): string | number {
        return this.blank;
    }

    public Initialize(width = 4, height = 4) {
        this.width = width;
        this.height = height;
        this.board = [];
        for (let y = 0; y < this.height; y++) {
            this.board.push([]);
            for (let x = 0; x < this.width; x++) this.board[y].push(this.blank);
        }
    }

    public UpdateSize(width: number, height: number) {
        if (height > 0) {
            while (this.board.length < this.height + height) {
                this.board.push([]);
                for (let x = 0; x < this.width; x++)
                    this.board[this.board.length - 1].push(this.blank);
            }
            this.height += height;
        } else if (height < 0) {
            while (this.board.length > this.height + height) this.board.pop();
            this.height += height;
        }
        if (width != 0) {
            for (let y = 0; y < this.height; y++) {
                if (width > 0) {
                    while (this.board[y].length < this.width + width)
                        this.board[y].push(this.blank);
                } else {
                    while (this.board[y].length > this.width + width)
                        this.board[y].pop();
                }
            }
            this.width += width;
        }
        this._Log();
    }

    public SetVal(x: number, y: number, value: number | string = this.blank) {
        //console.log("Setting (" + x + ", " + y + ") to " + value)
        this.board[y][x] = value;
    }

    public _Log() {
        for (let y = 0; y < this.height; y++) {
            console.log(this.GetCol(y), y);
        }
    }
}
