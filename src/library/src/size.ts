/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/
export class Pos {
    private x: number;
    private y: number;
    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    public String(unit: string | null = null): string {
        if (unit === null) return `${this.x}, ${this.y}`;
        return `${this.x}${unit}, ${this.y}${unit}`;
    }

    public get X(): number {
        return this.x;
    }

    public get Width(): number {
        return this.X;
    }

    public get Y(): number {
        return this.y;
    }

    public get Height(): number {
        return this.Y;
    }

    public set SetX(x: number) {
        this.x = x;
    }

    public set SetWidth(width: number) {
        this.SetX = width;
    }

    public set SetY(y: number) {
        this.y = y;
    }

    public set SetHeight(height: number) {
        this.SetY = height;
    }
}

export class Size extends Pos {}
