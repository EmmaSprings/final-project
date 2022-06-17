import { createSlice } from '@reduxjs/toolkit'

export const noteConsequences = createSlice({
    name: 'noteConsequences',
    initialState: {
    },

    reducers: {
        addConsequences: (store, action) => {
            store.items = action.payload
        }
    }
});