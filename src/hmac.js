/*
Store the calculated signature here, so we can verify it later.
*/
let signature;

/*
Fetch the contents of the "message" textbox, and encode it
in a form we can use for sign operation.
*/
function getMessageEncoding() {
    const messageBox = document.querySelector("#hmac-message");
    let message = messageBox.value;
    let enc = new TextEncoder();
    return enc.encode(message);
}

/*
Get the encoded message-to-sign, sign it and display a representation
of the first part of it in the "signature" element.
*/
async function signMessage(key) {
    const signatureValue = document.querySelector(".hmac .signature-value");
    signatureValue.classList.remove("valid", "invalid");
    
    let encoded = getMessageEncoding();
    signature = await window.crypto.subtle.sign(
        "HMAC",
        key,
        encoded
    );
    
    signatureValue.classList.add('fade-in');
    signatureValue.addEventListener('animationend', () => {
        signatureValue.classList.remove('fade-in');
    });
    let buffer = new Uint8Array(signature, 0, 5);
    signatureValue.textContent = `${buffer}...[${signature.byteLength} bytes total]`;
    
    // var decoder = new TextDecoder('utf8');
    // var b64encoded = btoa(decoder.decode(buffer));
    console.log("signature encoded", btoa(Uint8ToString(buffer)));
}

function Uint8ToString(u8a){
    var CHUNK_SZ = 0x8000;
    var c = [];
    for (var i=0; i < u8a.length; i+=CHUNK_SZ) {
        c.push(String.fromCharCode.apply(null, u8a.subarray(i, i+CHUNK_SZ)));
    }
    return c.join("");
}

/*
Fetch the encoded message-to-sign and verify it against the stored signature.
* If it checks out, set the "valid" class on the signature.
* Otherwise set the "invalid" class.
*/
async function verifyMessage(key) {
    const signatureValue = document.querySelector(".hmac .signature-value");
    signatureValue.classList.remove("valid", "invalid");
    
    let encoded = getMessageEncoding();
    let result = await window.crypto.subtle.verify(
        "HMAC",
        key,
        signature,
        encoded
    );
    
    signatureValue.classList.add(result ? "valid" : "invalid");
}

/*
Generate a sign/verify key, then set up event listeners
on the "Sign" and "Verify" buttons.
*/
window.crypto.subtle.generateKey(
    {
        name: "HMAC",
        hash: {name: "SHA-256"}
    },
    true,
    ["sign", "verify"]
).then((key) => {
    const signButton = document.querySelector(".hmac .sign-button");
    signButton.addEventListener("click", () => {
        console.log("key", key);
        signMessage(key);
    });
    
    const verifyButton = document.querySelector(".hmac .verify-button");
    verifyButton.addEventListener("click", () => {
        console.log("keyv", key);
        verifyMessage(key);
    });
});
    