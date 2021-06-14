import { useState } from 'react';

export const UseForm = <T extends Object> ( initialState: T ) => {

    const [ form, setForm ] = useState( initialState );

    const onChange = ( value: string, field: keyof T ) => {
        setForm({
            ...form,
            [ field ]: value
        })
    }

    return {
        ...form,
        onChange
    }
}
