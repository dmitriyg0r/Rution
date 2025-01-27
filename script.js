class NotesApp {
    constructor() {
        this.notes = JSON.parse(localStorage.getItem('notes')) || [];
        this.currentNote = null;
        
        // Элементы DOM
        this.notesList = document.getElementById('notesList');
        this.newNoteBtn = document.getElementById('newNoteBtn');
        this.saveNoteBtn = document.getElementById('saveNoteBtn');
        this.titleInput = document.getElementById('noteTitle');
        this.contentInput = document.getElementById('noteContent');
        
        // Привязка обработчиков событий
        this.newNoteBtn.addEventListener('click', () => this.createNewNote());
        this.saveNoteBtn.addEventListener('click', () => this.saveNote());
        
        // Инициализация
        this.displayNotes();
    }
    
    createNewNote() {
        this.currentNote = {
            id: Date.now(),
            title: '',
            content: '',
            date: new Date()
        };
        this.titleInput.value = '';
        this.contentInput.value = '';
    }
    
    saveNote() {
        if (!this.currentNote) return;
        
        this.currentNote.title = this.titleInput.value;
        this.currentNote.content = this.contentInput.value;
        
        const existingNoteIndex = this.notes.findIndex(note => note.id === this.currentNote.id);
        
        if (existingNoteIndex !== -1) {
            this.notes[existingNoteIndex] = this.currentNote;
        } else {
            this.notes.push(this.currentNote);
        }
        
        this.saveToLocalStorage();
        this.displayNotes();
    }
    
    displayNotes() {
        this.notesList.innerHTML = '';
        this.notes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.className = 'note-item';
            noteElement.innerHTML = `
                <h3>${note.title || 'Без названия'}</h3>
                <p>${note.content.substring(0, 50)}...</p>
            `;
            noteElement.addEventListener('click', () => this.editNote(note));
            this.notesList.appendChild(noteElement);
        });
    }
    
    editNote(note) {
        this.currentNote = note;
        this.titleInput.value = note.title;
        this.contentInput.value = note.content;
    }
    
    saveToLocalStorage() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    const app = new NotesApp();
}); 