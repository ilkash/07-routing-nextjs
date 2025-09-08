import axios from "axios";
import type { Note } from "@/types/note";
import { url } from "inspector";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export const fetchNotes = async (
  page: number,
  mySearchNote: string,
  tag?: string
): Promise<FetchNotesResponse> => {
  const ulr = tag === "All" ? `/notes${tag}` : "/notes";
  const response = await axios.get<FetchNotesResponse>(ulr, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
    params: {
      page,
      search: mySearchNote,
      tag,
    },
  });
  return response.data;
};

export const deleteNote = async (noteID: string): Promise<Note> => {
  const response = await axios.delete<Note>(`/notes/${noteID}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
};

export const createNote = async (
  newNote: Omit<Note, "id" | "createdAt" | "updatedAt">
): Promise<Note> => {
  const response = await axios.post<Note>("/notes", newNote, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });

  return response.data;
};

export const fetchNoteById = async (noteID: string): Promise<Note> => {
  const response = await axios.get<Note>(`/notes/${noteID}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
};

export const fetchTagList = async (): Promise<string[]> => {
  const response = await axios.get<FetchNotesResponse>(`/notes`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  const notes = response.data.notes;
  const tags = [...new Set(notes.map((note: { tag: string }) => note.tag))];
  return tags;
};
