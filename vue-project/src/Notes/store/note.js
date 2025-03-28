/**
 * @Module useCurrentNoteStore
 * @description Vuex-стор для работы с заметками в компоненте src/components/Todoo.vue.
 * Этот стор управляет состоянием заметок, включая их добавление, изменение и удаление.
 * @property {Object} notes - Список заметок из хранилища
 * 
 * 
 * @vue-event {Number} setNotes - Устанавливает значения
 * @vue-event {Number} getNotes - Получает список заметок или пустой массив, если заметки не загружены
 * @vue-event {Number} addNote  - Добавляет новую заметку
 * @vue-event {Number} setNote  - Функция для изменения заметки
 * @vue-event {Number} deleteNote - Удаляет заметку
 * 
 * 
 *
 */



import { defineStore } from "pinia";
import { getAll, apiSetNote } from "../api";

/**
 * Класс для работы с заметками.
 */
export const useCurrentNoteStore = defineStore("CurrentNote", {
    state: () => ({
        notes: null, // Список заметок
    }),

    getters: {
        // Здесь можно добавить геттеры, если они понадобятся
    },

    actions: {
        setNotes() {
            this.notes = getAll();
        },

        getNotes() {
            if (this.notes === null) {
                this.notes = getAll();
            }
            return this.notes;
        },

        addNote() {
            const Id =
                (this.notes.length > 0
                    ? Math.max(
                          ...this.notes.map((note) =>
                              typeof note.id === "number" ? note.id : -Infinity
                          )
                      )
                    : 0) + 1;
            const currentTime = new Date().toISOString();
            this.notes.push({ id: Id, created_at: currentTime });
            return Id;
        },

        setNote(item) {
            const index = this.notes.findIndex((note) => note.id === item.id);
            if (index !== -1) {
                this.notes[index] = item;
                apiSetNote(item);
            }
        },

        /**
         * Удаляет заметку.
         * @param {number} id - Id заметки, которую нужно удалить.
         * @returns {void} Не возвращает значения.
         */
        deleteNote(id) {
            const index = this.notes.findIndex((note) => note.id === id);
            if (index !== -1) {
                this.notes.splice(index, 1); // Удаляем элемент из массива
            }
        },
    },
    persist: true,
});
