import * as React from "react";

export class FooterComponent extends React.Component<{}> {
    render() {
        return (
            <div id="containerFooter">
                <div id="containerFooter_Name">this.title</div>
                <div id="containerFooter_Version">this.version</div>
                <div id="containerFooter_Copyright">
                    Copyright ©2022 DAAV, LLC
                </div>
            </div>
        );
    }
}
