import React from "react";

export default function Detail(props) {
    return (
        <div>
            Params value: {props.match.params.id}
            <br />
            Current path name: {props.match.url}
        </div>
    );
}
