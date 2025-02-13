import { render, screen, fireEvent, waitFor } from "@testing-library/vue";
import { createPinia } from "pinia";
import { setActivePinia } from "pinia";
import Todoo from "../components/Todoo.vue"; // Убедитесь, что путь к компоненту правильный
import { useCurrentNoteStore } from "@/Notes/store/note"; // Импортируйте ваше хранилище
import "@testing-library/jest-dom";

describe("Todoo Component", () => {
    let NotesStore;

    beforeEach(() => {
        const pinia = createPinia();
        setActivePinia(pinia);
        NotesStore = useCurrentNoteStore();
        NotesStore.setNotes();
    });

    it("Корректное отображение навания", () => {
        render(Todoo);
        expect(screen.getByText("Заметки")).toBeInTheDocument();
    });

    it("Возможность создать заметку", async () => {
        render(Todoo);
        const addButton = screen.getByText("Создать заметку");
        await fireEvent.click(addButton);
        await waitFor(() => {
            const textbox = screen.getAllByRole("textbox");
            expect(textbox.length).toBeGreaterThan(0);
        });
    });

    it("Возможность удалить заметку", async () => {
        render(Todoo);
        const NotesCount = NotesStore.getNotes().length;
        const deleteButton = screen.getAllByText("Удалить");
        fireEvent.click(deleteButton[0]);

        await waitFor(() => {
            expect(NotesCount).toBeGreaterThan(NotesStore.getNotes().length);
        });
    });

    it("Возможность изменить заметку", async () => {
        render(Todoo);
        const ChangeButton = screen.getAllByText("Изменить");
        await waitFor(() => {
            fireEvent.click(ChangeButton[0]);
            const textbox = screen.getAllByRole("textbox");
            expect(textbox.length).toBeGreaterThan(0);
        });
    });
});
