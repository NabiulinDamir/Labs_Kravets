import { render, screen, fireEvent, waitFor } from "@testing-library/vue";
import { createPinia } from "pinia";
import { setActivePinia } from "pinia";
import { useCurrentNoteStore } from "@/Notes/store/note"; // Импортируйте ваше хранилище
import "@testing-library/jest-dom";

describe("Unit tests notes store", () => {
    let NotesStore;

    beforeEach(() => {
        const pinia = createPinia();
        setActivePinia(pinia);
        NotesStore = useCurrentNoteStore();
    });

    it('Инициализация стора', () => {
        NotesStore.setNotes();
        expect(NotesStore.notes.length).toBeGreaterThan(0);
    });
    it('Добавление заметки', () => {
        NotesStore.setNotes();
        const countNotes = NotesStore.notes.length
        NotesStore.addNote();
        expect(NotesStore.notes.length).toBeGreaterThan(countNotes);
    });
    it('Удаление заметки', () => {
        NotesStore.setNotes();
        const countNotes = NotesStore.notes.length
        NotesStore.deleteNote(NotesStore.notes[0].id);
        expect(countNotes).toBeGreaterThan(NotesStore.notes.length);
    });
    it('Изменение заметки', () => {
        NotesStore.setNotes();
        const noteIndex = 0;
        const beforeContent = NotesStore.notes[noteIndex].content;
        const afterContent = "Данные";
        
        NotesStore.notes[noteIndex].content = afterContent;
    
        expect(NotesStore.notes[noteIndex].content).toBe(afterContent);
        expect(NotesStore.notes[noteIndex].content).not.toBe(beforeContent);
    });
});
