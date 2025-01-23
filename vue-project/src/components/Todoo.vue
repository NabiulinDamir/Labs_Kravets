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

<script setup>
import { useCurrentNoteStore } from '@/Notes/store/note';
import { ref } from 'vue';
const NotesStore = useCurrentNoteStore()

const notes = NotesStore.getNotes()
const changeMode = ref(null)

const expandedNoteId = ref(null)

const toggleBody = (noteId) => {
    if (expandedNoteId.value === noteId) {
        expandedNoteId.value = null;
    } else {
        expandedNoteId.value = noteId;
    }
    changeMode.value = null
    
}

const changeModeClick = (id) => {
    changeMode.value = id
}

const isExpanded = (id) => {
    return expandedNoteId.value === id;
}

const deleteNote = (id) => {
    NotesStore.deleteNote(id)
}

const CreateNote = () => {
    const newNoteId = NotesStore.addNote()
    expandedNoteId.value = newNoteId;
    changeModeClick(newNoteId)
}
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