<template>
    <div class="container">
        <div class="name" @click="NotesStore.setNotes()">Заметки</div>
        <div class="note_container">
            <div class="note_item" v-for="item in notes" :key="item.id">
                <div class="note_item_header" @click="toggleBody(item.id)">
                    <div v-if="item.id !== changeMode" class="Text">{{ item.title }}</div>
                    <textarea v-if="item.id === changeMode" v-model="item.title" class="TextArea" @click.stop></textarea>
                    <div>{{ item.created_at?.split('T')[0] }}</div>
                </div>
                <div class="note_item_body" :class="{ 'expanded': isExpanded(item.id) }">
                    <div v-if="item.id !== changeMode" class="Text">{{ item.content }}</div>
                    <textarea v-else v-model="item.content" class="TextArea" ></textarea>
                    <div class="button_container">
                        <div class="button" v-if="item.id !== changeMode" @click="changeModeClick(item.id)">Изменить</div>
                        <div class="button" v-else @click="saveChangeNode(item)">Сохранить</div>

                        <div class="button" @click="deleteNote(item.id)">Удалить</div>
                    </div>
                </div>
            </div>

            <div class="note_item_header" @click="CreateNote()">Создать заметку</div>
        </div>
        
    </div>
</template>

  
<script>

/**
 * @Module Todoo component
 * @description компонент vue для работы с заметками
 * @vue-data {Object} notes - Список заметок из хранилища
 * @vue-data {Number|null} changeMode - ID поля текста, которое меняется на TextArea (null, если не используется)
 * @vue-data {Number|null} expandedNoteId - ID раскрытого поля заметок (null, если нет раскрытых заметок)
 * 
 * @vue-event {Number} changeModeClick - Присваивает changeMode выбранный ID
 * @vue-event {Number} toggleBody - Присваивает expandedNoteId выбранный ID или сбрасывает его
 * @vue-event {Number} isExpanded - Проверяет, является ли входящий ID равным expandedNoteId
 * @vue-event {Number} deleteNote - Удаляет заметку по указанному ID
 * @vue-event {} CreateNote - Создает новую заметку и раскрывает её
 */


import { useCurrentNoteStore } from '@/Notes/store/note'; 
import { ref } from 'vue';

export default {
data() {
    return {
    notes: useCurrentNoteStore().getNotes(),
    changeMode: null,
    expandedNoteId: null 
    };
},
methods: {
    toggleBody(noteId) {
    if (this.expandedNoteId === noteId) {
        this.expandedNoteId = null;
    } else {
        this.expandedNoteId = noteId;
    }
    this.changeMode = null;
    },

    changeModeClick(id) {
    this.changeMode = id;
    },

    isExpanded(id) {
    return this.expandedNoteId === id;
    },
/**
 * удаляет заметку
 */
    deleteNote(id) {
    const NotesStore = useCurrentNoteStore();
    NotesStore.deleteNote(id);
    },
/**
 * Создаёт новую заметку
 */
    CreateNote() {
    const NotesStore = useCurrentNoteStore();
    const newNoteId = NotesStore.addNote();
    this.expandedNoteId = newNoteId; // Раскрыть новую заметку
    this.changeModeClick(newNoteId); // Установить режим изменения для новой заметки
    }
}
};
</script>
  

<style lang="scss" scoped>
.container{
    width: 500px;
    background-color: #5b5764;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 30px;
    
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.name{
    padding: 10px;
    font-size: 30px;
    color: aliceblue;

}
.note{
    &_container{
        width: 100%;
        
        display: flex;
        flex-direction: column;
    }
    &_item_header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        font-size: 20px;
        background-color: #b6aeca;
        transition: 200ms;
        &:hover{
            background-color:  rgb(62, 69, 100);
        }

    }
    &_item_body{
        padding-left: 10px;
        padding-right: 10px;
        height: 0px;
        background-color: #b6aeca;
        margin-bottom: 5px;
        transition: 200ms;
        visibility: hidden;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        &.expanded {
            height: 100px;
            visibility: visible;
        }
    }


}

.button{
    padding: 3px;
    background-color: #5b5764;
    margin-right: 10px;
    user-select: none;
    &_container{
        display: flex;
        flex-direction: row;
        margin-top: 10px;
    }
}
.TextArea{
    height: 100%;
    max-width: 100%;

}

</style>