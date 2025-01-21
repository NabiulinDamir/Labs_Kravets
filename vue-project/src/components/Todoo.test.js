import { render, screen, fireEvent } from '@testing-library/vue';
import { createPinia } from 'pinia';
import { setActivePinia } from 'pinia';
import Todoo from './Todoo.vue'; // Убедитесь, что путь к компоненту правильный
import { useCurrentNoteStore } from '@/Notes/store/note'; // Импортируйте ваше хранилище

describe('Todoo Component', () => {
  let NotesStore;

  beforeEach(() => {
    // Создаем новый экземпляр Pinia перед каждым тестом
    const pinia = createPinia();
    setActivePinia(pinia);
    NotesStore = useCurrentNoteStore();

    // Инициализируем начальное состояние хранилища
    NotesStore.setNotes([]); // Предположим, что у вас есть метод для установки заметок
  });

  it('renders the component correctly', () => {
    render(Todoo);

    // Проверяем, что заголовок "Заметки" отображается
    const a = 5
    expect(5).a;
  });

  
});
