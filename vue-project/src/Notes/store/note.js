/**
 * @module store
 * @description Vuex-стор для работы с компонентом src/components/Todoo.vue
 */
import { defineStore } from 'pinia'
import { getAll, apiSetNote } from '../api'

/**
 * Класс для работы с заметками.
 */
export const useCurrentNoteStore = defineStore('CurrentNote', {
  state: () => ({
    notes: null,
  }),

  getters: {

  },

  actions: {
    /**
     * Устанавливает список заметок.
     * @param {Array} notes - Список заметок.
     */
    setNotes() {
      this.notes = getAll();
    },

    /**
     * Получает список заметок.
     * @returns {Array} Список заметок.
     */
    getNotes() {
      if (this.notes === null) {
        this.notes = getAll();
      }
      return this.notes;
    },

    /**
     * Добавляет новую заметку.
     * @returns {number} Id новой заметки.
     */
    addNote() {
      const Id = (this.notes.length > 0 ? Math.max(...this.notes.map(note => (typeof note.id === 'number' ? note.id : -Infinity))) : 0) + 1;
      const currentTime = new Date().toISOString();
      this.notes.push({ "id": Id, "created_at": currentTime });
      return Id;
    },

    /**
     * Изменяет заметку.
     * @param {object} item - Получает измененную заметку.
     */
    setNote(item) {
      const index = this.notes.findIndex(note => note.id === item.id);
      if (index !== -1) {
        this.notes[index] = item;
        apiSetNote(item); 
      }
    },

    /**
     * Удаляет заметку.
     * @param {number} id - Получает id заметки, которую нужно удалить.
     */
    deleteNote(id) {
      const index = this.notes.findIndex(note => note.id === id);
      if (index !== -1) {
        this.notes.splice(index, 1); // Удаляем элемент из массива
      }
    }
  },
  persist: true
});
