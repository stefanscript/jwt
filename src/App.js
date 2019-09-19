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

function App() {
    let token;
    
    function onClickHandler(e) {
        e.preventDefault();
        const s = document.getElementById("secret").value;
        digestMessage(s).then(digest => {
            token = jwt.sign({foo: 'bar'}, hexString(digest));
            console.log("secret", hexString(digest));
            console.log("token", token);
        });
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
