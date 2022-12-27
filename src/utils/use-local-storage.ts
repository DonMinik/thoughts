//by https://lorisleiva.com/gists/abstract-local-storage-in-vue-3
import {  subtle } from 'crypto'
import { customRef, Ref } from 'vue'

export default function (key: string, defaultValue: unknown, encryption?: boolean):Ref {
    //encryption = false
    return customRef((track, trigger) => ({
        get: () => {
            track()
            let value = localStorage.getItem(key)
            if (encryption && value) {
                value = decrypt(value)
            }
        
            return value ? JSON.parse(value) : defaultValue
        },
        set: value => {
            if (value === null) {
                localStorage.removeItem(key)
            } else {
                value = JSON.stringify(value)
                if(encryption) {
                    value = encrypt(value);
                }
                localStorage.setItem(key, value)
            }
            trigger()
        },
    }))
}

export const StorageKeys = {
    THOUGHTS: 'thoughts'
}

const THOUGHT_STORAGE_KEY = 'I-want-my-thoughts-to-be-stored-enchrypted'

function encrypt(data: string): string {
    let result = '';
    let key = THOUGHT_STORAGE_KEY
    while (key.length < data.length) {
         key += key;
    }
    for(let i=0; i<data.length; i++) {
        const value1 = data[i].charCodeAt(0);
        const value2 = key[i].charCodeAt(0);

        const xorValue = value1 ^ value2;

        let xorValueAsHexString = xorValue.toString(16);

        if (xorValueAsHexString.length < 2) {
            xorValueAsHexString = "0" + xorValueAsHexString;
        }

        result += xorValueAsHexString;
    }
    return result;
    }

function decrypt(data: string): string {
    let result = ''
    let key = THOUGHT_STORAGE_KEY
    while (key.length < data.length/2) {
        key += key;
    }

    for (let i=0; i<data.length; i+=2) {
        const hexValueString = data.substring(i, i+2);
        const value1 = parseInt(hexValueString, 16);
        const value2 = key.charCodeAt(i/2);

        const xorValue = value1 ^ value2;

        result += String.fromCharCode(xorValue);

    }
    return result;
}