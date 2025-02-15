const base64UrlDecode = (base64Url) => {
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const paddedBase64 = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
    const decodedString = atob(paddedBase64);
    return decodedString;
}

export const decodePayload = (token) => {
    try {
        const payloadBase64Url = token.split('.')[1];
        const decodedPayload = base64UrlDecode(payloadBase64Url);
        return JSON.parse(decodedPayload);
    } catch (error) {
        return null;
    }
}