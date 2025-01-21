import { defineStore } from 'pinia'
import { getAll, apiSetNote } from '../api'
export const useCurrentNoteStore = defineStore('CurrentNote', {
  state: () => ({
    notes: null,
  }),
  getters: {

  },
  actions: {
    setNotes(){
      this.notes = getAll()
    },
    getNotes(){
        if (this.notes === null) {this.notes = getAll()}
        return this.notes
    },


    setNote(item) {
      if(item.id === 'new'){
        const maxId = this.notes.length > 0 ? Math.max(...this.notes.map(note => (typeof note.id === 'number' ? note.id : -Infinity))) : 0;
        item.id = maxId + 1; // Присваиваем новый id
      }
      const index = this.notes.findIndex(note => note.id === item.id);
      if (index !== -1) {
        this.notes[index] = item; // Обновляем объект по индексу
        apiSetNote(item); // Сохраняем изменения через API
      }
    },
    deleteNote(item) {
      const index = this.notes.findIndex(note => note.id === item.id);
      if (index !== -1) {
        this.notes.splice(index, 1); // Удаляем элемент из массива
        
      }
    }
  },
  persist: true
})
