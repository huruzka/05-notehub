import axios from "axios";
import type { Note, NoteTag } from "../types/note";

export interface FetchNotesParams {
  page: number;
  query: string;
}

interface FetchNotesResponse{
    notes: Note[];
    id: string;
    totalPages: number;
    page: number;
    perPage: number;
    totalResults: number;
}

export interface NewNote{
    title: string;
    content: string;
    tag: NoteTag;
}

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

const apiClient = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${myKey}`, // v4 token
  },
});

//запит на список нотаток
export const fetchNotes = async ({ page, query }: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await apiClient.get<FetchNotesResponse>("/notes", {
    params: { page, perPage: 12, ...(query ? { search: query } : {}) },
  });
  return response.data;
};
//створення нової нотатки
export const createNote = async (noteData: NewNote): Promise<Note> => {
    const response = await apiClient.post<Note>("/notes", noteData);
    return response.data;
};

//видалення нотатки за ID
export const deleteNote = async (id: string): Promise<Note> => {
  if (!id) {
    throw new Error("Note ID required");
  }
  const response = await apiClient.delete<Note>(`/notes/${id}`);
  return response.data;
};