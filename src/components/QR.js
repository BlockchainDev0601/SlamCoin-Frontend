import React from "react";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";

// ReactDOM.render(<QRCode value="hey" />, document.getElementById("Container"));

const QR = () => {

    return (
        <QRCode value="1234567890" size={111}/>
    )
}

export default QR;