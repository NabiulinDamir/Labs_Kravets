import mainJson from './mainJson.json'

export const getAll = () => mainJson.notes

export const apiSetNote = (item) => {
    const index = mainJson.notes.findIndex(note => note.id === item.id);
    if (index !== -1) {
        mainJson.notes[index] = item;
    }
};
