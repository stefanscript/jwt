export async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder('utf-8').encode(message);
    
    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    
    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    
    // convert bytes to hex string
    return hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
}

export function hexString(buffer) {
    const byteArray = new Uint8Array(buffer);
    
    const hexCodes = [...byteArray].map(value => {
        const hexCode = value.toString(16);
        return hexCode.padStart(2, '0');
    });
    
    return hexCodes.join('');
}

export function digestMessage(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    return window.crypto.subtle.digest('SHA-256', data);
}
