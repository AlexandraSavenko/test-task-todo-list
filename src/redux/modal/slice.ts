import { createSlice } from "@reduxjs/toolkit";
import type { Todo } from "../../types/todo";

interface InitialState {
    isModalOpen: string;
    editingTodo: Todo | null
}

const InitialState: InitialState = {
    isModalOpen: '',
    editingTodo: null

}

const modalSlice = createSlice({
    name: "modal",
    initialState: InitialState,
    reducers: {
setModalOpen (state, action) {
state.isModalOpen = action.payload;
},
setEditingTodo (state, action) {
    state.editingTodo = action.payload;
}
    }
})

export default modalSlice.reducer;

export const {setModalOpen, setEditingTodo} = modalSlice.actions;