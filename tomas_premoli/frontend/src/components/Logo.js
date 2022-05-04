import React, { Component } from "react";

export default class TPSVG extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={this.props.width}
                height={this.props.height}
                style={{
                    margin: this.props.m,
                    marginLeft: this.props.ml,
                    marginRight: this.props.mr
                }}
                viewBox="0 0 524 636"
            // {...props}
            >
                <defs>
                    <style>{".cls-1{fill:#fff;fill-rule:evenodd}"}</style>
                </defs>
                <path
                    id="T"
                    className="cls-1"
                    d="M192.848 512.963V118.047h70.583V40.463H16.681v77.584h71.167v394.916h105Z"
                />
                <path
                    id="P"
                    className="cls-1"
                    d="M342.717 578.467V399.3h37.5q34.376 0 61.979-9.9t43.75-35.677q16.138-25.782 16.146-74.74 0-39.061-11.979-66.406t-36.459-41.667q-24.486-14.319-62.5-14.323H249.488v421.88h93.229Zm0-356.25h30.729q18.75 0 27.6 7.292a32.294 32.294 0 0 1 11.2 19.531 152.359 152.359 0 0 1 2.344 28.386q0 19.275-2.865 31.771t-11.718 18.75q-8.863 6.249-26.042 6.25h-31.25v-111.98Z"
                />
            </svg>
        )
    };
}
