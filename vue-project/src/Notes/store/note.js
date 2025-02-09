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
   * @param {Array} this.notes - Список заметок
   */
    setNotes(){
      this.notes = getAll()
    },
  /**
   * Получчает список заметок.
   * @param {Array} this.notes - Список заметок
   */
    getNotes(){
        if (this.notes === null) {this.notes = getAll()}
        return this.notes
    },
      /**
   * Добавляет новую заметку.
   * @returns {int} Id новой заметки.
   */
    addNote(){
      const Id = (this.notes.length > 0 ? Math.max(...this.notes.map(note => (typeof note.id === 'number' ? note.id : -Infinity))) : 0) + 1;
      const currentTime = new Date().toISOString();
      this.notes.push({"id": Id, "created_at" : currentTime})
      return Id
      
    },
   /**
   * Изменяет заметку.
   * @param {object} item получает измененную заметку.
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
   * @param {int} item получает id заметки, которую нужно удалить.
   */
    deleteNote(id) {
      const index = this.notes.findIndex(note => note.id === id);
      if (index !== -1) {
        this.notes.splice(index, 1); // Удаляем элемент из массива
      }
    }
    
  },
  persist: true
})
