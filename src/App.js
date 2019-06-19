import React from 'react';
import './App.css';
import {digestMessage, sha256, hexString} from "./utils";
var jwt = require('jsonwebtoken');

let token;
sha256("1234").then(secret => {
    token = jwt.sign({ foo: 'bar' }, secret);
    console.info("secret", secret);
    console.info("token", token);
});

let token2;
digestMessage("1234").then(digest => {
    token2 = jwt.sign({ foo: 'bar' }, hexString(digest));
    console.info("secret2", hexString(digest));
    console.info("token2", token2);
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <pre>
          {token}
          </pre>
          <pre>
          {token2}
          </pre>
      </header>
    </div>
  );
}

export default App;
