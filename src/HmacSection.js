import React from "react";
import "./hmac_section.css";
require("./hmac.js");

function HmacSection() {
    return (
        <section className="sign-verify hmac">
            <h2 className="sign-verify-heading">HMAC</h2>
            <section className="sign-verify-controls">
                <div className="message-control">
                    <label htmlFor="hmac-message">Enter a message to sign:</label>
                    <input type="text" id="hmac-message" name="message" size="25"
                           value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1Njg2NjY4NTZ9" onChange={() => console.log()} />
                </div>
                <div className="signature">Signature:<span className="signature-value" /></div>
                <input className="sign-button" type="button" value="Sign"/>
                <input className="verify-button" type="button" value="Verify"/>
            </section>
            <br />
            <br />
            <br />
            <br />
            <br />
        </section>
    )
}

export default HmacSection;