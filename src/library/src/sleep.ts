/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/
export function Sleep(ms: number) {
    const startTime: Date = new Date();
    let curTime: Date = new Date();
    while ((curTime as any) - (startTime as any) < ms) curTime = new Date();
}

export async function Delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
