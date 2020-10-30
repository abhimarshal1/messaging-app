import { useState, useEffect } from 'react'

const PREFIX = "messaging-app-";

export const useLocalStorage = (key, initialValue) => {
    const prefixedKey = PREFIX + key;
    const [value, setValue] = useState(()=> {
        const jsonValue = localStorage.getItem(prefixedKey);
        if(jsonValue != null) return JSON.parse(jsonValue);
        if(typeof initialValue === Function){
            return initialValue();
        } else {
            return initialValue;
        }
    })

    useEffect(()=>{
        localStorage.setItem(prefixedKey, JSON.stringify(value));
    }, [prefixedKey, value]);

    return [value, setValue];
}
