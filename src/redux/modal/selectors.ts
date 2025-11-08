import type { RootState } from "../store";

export const selectIsModalOpen = (state: RootState) => state.modal.isModalOpen;
export const selectEditingTodo = (state: RootState) => state.modal.editingTodo;