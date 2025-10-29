import api from "../api/api"
import type { Note, NoteFormValues } from "../types/note"

interface FetchNotesResponse {
    notes: Note[],
    totalPages: number
}
interface FetchNotesParams {
    searchValue: string,
    page: number
}
export const fetchNotes = async ({searchValue, page}: FetchNotesParams): Promise<FetchNotesResponse> => {
    const searchParams: Record<string, string> = {}
    if(searchValue) searchParams.search = searchValue
    if(page) searchParams.page = page.toString()
    const query = new URLSearchParams(searchParams)
const res = await api.get<FetchNotesResponse>(`/notes?${query}`);
return res.data
}

export const createNote = async (newNote: NoteFormValues) => {
    const res = await api.post<FetchNotesResponse>('/notes', newNote);
    return res.data
}
export const deleteNote = async (noteId: string) => {
     const res = await api.delete(`/notes/${noteId}`);
    return res.data
}