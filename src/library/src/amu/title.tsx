import * as React from "react";

import {TitleInterface} from "./titleInterface";

export class TitleComponent extends React.Component<TitleInterface, {}> {
    constructor(props: TitleInterface) {
        super(props);
    }
    render() {
        return (
            <div id="containerTitle">
                <div id="containerTitle_Logo">
                    <a href="" target="_blank" rel="noopener noreferrer">
                        <img src="../../assets/DAAV-logo.png" alt="DAAV"></img>
                    </a>
                </div>
                <div id="containerTitle_Name">
                    <h2>{this.props.title}</h2>
                </div>
                <div id="containerTitle_Version">
                    <sup>{this.props.version}</sup>
                </div>
                <div id="containerTitle_Tagline">
                    <p>
                        An
                        <a
                            href="https://github.com/daavllc/Amucretion"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            open source
                        </a>
                        game library
                    </p>
                </div>
            </div>
        );
    }
}
