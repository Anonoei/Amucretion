/*
 Copyright 2022 DAAV, LLC
 Licensed under the MIT license. See LICENSE for details.
*/
import moment from "moment";

export enum LogLevel {
    Trace = 0,
    Debug,
    Info,
    Warn,
    Error,
}

export class Logger {
    private name: string;
    private level: LogLevel;

    public constructor(name: string, level: LogLevel = LogLevel.Info) {
        this.name = name;
        this.level = level;
    }

    public get Name(): string {
        return this.name;
    }

    public get LevelString(): string {
        return LogLevel[this.level];
    }

    public get Level(): number {
        return this.level;
    }

    public trace(message: string) {
        this.log(LogLevel.Trace, message);
    }

    public debug(message: string) {
        this.log(LogLevel.Debug, message);
    }

    public info(message: string) {
        this.log(LogLevel.Info, message);
    }

    public warn(message: string) {
        this.log(LogLevel.Warn, message);
    }

    public error(message: string) {
        this.log(LogLevel.Error, message);
    }

    private log(level: LogLevel, message: string) {
        if (level < this.level) return;
        if (this.name == "")
            console.log(`${this.Timestamp} ${LogLevel[level]}: ${message}`);
        else
            console.log(
                `${this.Timestamp} <${this.name}> [${LogLevel[level]}]: ${message}`
            );
    }

    private get Timestamp(): string {
        return moment().format("YYYY-MM-DD HH:mm:ss");
    }
}
