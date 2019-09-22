import React from 'react';
import './App.css';
import {digestMessage, hexString} from "./utils";
import HmacSection from "./HmacSection";
var jwt = require('jsonwebtoken');

// let token;
// sha256("1234").then(secret => {
//     token = jwt.sign({ foo: 'bar' }, secret);
//     console.info("secret", secret);
//     console.info("token", token);
// });
//
// let token2;
// digestMessage("1234").then(digest => {
//     token2 = jwt.sign({ foo: 'bar' }, hexString(digest));
//     console.info("secret2", hexString(digest));
//     console.info("token2", token2);
// });

// encoder to convert string to Uint8Array
function ver2(secret) {
    var enc = new TextEncoder("utf-8");
    
    window.crypto.subtle.importKey(
        "raw", // raw format of the key - should be Uint8Array
        enc.encode(secret),
        { // algorithm details
            name: "HMAC",
            hash: {name: "SHA-256"}
        },
        false, // export = false
        ["sign"] // what this key can do
    ).then( key => {
        window.crypto.subtle.sign(
            "HMAC",
            key,
            enc.encode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhYmMiOnt9LCJ2ZXJzaW9uIjoxfQ")
        ).then(signature => {
            const signatureT1 = new Uint8Array(signature);
            console.log("signature t1", signatureT1);
            
            const signatureT2 = Array.prototype.map.call(signatureT1, x => ('00'+x.toString(16)).slice(-2)).join("");
            console.log("token t2", signatureT2);
    
            function Uint8ToString(u8a){
                var CHUNK_SZ = 0x8000;
                var c = [];
                for (var i=0; i < u8a.length; i+=CHUNK_SZ) {
                    c.push(String.fromCharCode.apply(null, u8a.subarray(i, i+CHUNK_SZ)));
                }
                return c.join("");
            }
    
            function _arrayBufferToBase64( buffer ) {
                var binary = '';
                var bytes = new Uint8Array( buffer );
                var len = bytes.byteLength;
                for (var i = 0; i < len; i++) {
                    binary += String.fromCharCode( bytes[ i ] );
                }
                return window.btoa( binary );
            }
            
            // Usage
            var b64encoded = btoa(Uint8ToString(signatureT1));
            console.log("token ver2 b64", b64encoded);
            console.log("token ver2 b64", _arrayBufferToBase64(signatureT1));
        });
    });
}


function App() {
    // let token;
    
    function onClickHandler(e) {
        e.preventDefault();
        ver2("secret");
        // const s = document.getElementById("secret").value;
        // digestMessage(s).then(digest => {
        //     token = jwt.sign({foo: 'bar'}, hexString(digest));
        //     console.log("secret", hexString(digest));
        //     console.log("token", token);
        //     ver2(hexString(digest));
        // });
    }
    
    return (
        <div className="App">
            <header className="App-header">
                <input name="secret" id={"secret"}/>
                <button onClick={(e) => onClickHandler(e)}>Click</button>
            </header>
            <HmacSection />
        </div>
    );
}

export default App;
