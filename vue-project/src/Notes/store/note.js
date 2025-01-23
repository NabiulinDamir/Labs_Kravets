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

    addNote(){
      const Id = (this.notes.length > 0 ? Math.max(...this.notes.map(note => (typeof note.id === 'number' ? note.id : -Infinity))) : 0) + 1;
      const currentTime = new Date().toISOString();
      this.notes.push({"id": Id, "created_at" : currentTime})
      return Id
      
    },

    setNote(item) {
      const index = this.notes.findIndex(note => note.id === item.id);
      if (index !== -1) {
        this.notes[index] = item;
        apiSetNote(item); 
      }
    },
    deleteNote(id) {
      const index = this.notes.findIndex(note => note.id === id);
      if (index !== -1) {
        this.notes.splice(index, 1); // Удаляем элемент из массива
      }
    }
    
  },
  persist: true
})
