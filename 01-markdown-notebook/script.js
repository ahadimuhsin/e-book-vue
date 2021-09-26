Vue.filter('date', time => moment(time).format('DD/MM/YY, HH:mm'));

new Vue({
    el: "#notebook",

    //data
    data() {
        return {
            notes: JSON.parse(localStorage.getItem('notes')) || [],
            selectedId: localStorage.getItem('selected-id') || null,
        }
    },

    // created() {
    //     this.content = localStorage.getItem('content') || 'Write your text here with **markdown**'
    // },

    //mengubah data menjadi bentuk yang diinginkan
    computed: {
        notePreview() {
            //markdown rendered to HTML
            return this.selectedNote ? marked(this.selectedNote.content) : '';
        },
        addButtonTitle() {
            return this.notes.length + ' note(s) already';
        },
        selectedNote() {
            //find matching note with selectedId
            return this.notes.find(note => note.id === this.selectedId);
        },
        sortedNotes() {
            return this.notes.slice()
                .sort((a, b) => a.created - b.created)
                .sort((a, b) => (a.favorite === b.favorite) ? 0 : a.favorite ? -1 : 1)
        },
        linesCount() {
            if (this.selectedNote) {
                //hitung jumlah karakter
                return this.selectedNote.content.split(/\r\n|\r\n/).length;
            }
        },
        wordsCount() {
            if (this.selectedNote) {

                let s = this.selectedNote.content;
                //ubah karakter garis baru jadi white-spaces
                s = s.replace(/\n/g, ' ');
                //exclude start and end white-spaces
                s = s.replace(/(^\s*) | (\s*$)/gi, '');
                //ubah 2 atau lebih karaktter white-spaces duplikat jadi 1
                s = s.replace(/\s\s+/gi, ' ');
                //return jumlah spasi
                return s.split(' ').length;
            }
        },
        charactersCount() {
            if (this.selectedNote) {
                return this.selectedNote.content.split('').length;
            }
        }
    },
    methods: {
        addNote() {
            const time = Date.now();
            //default new one
            const note = {
                id: String(time),
                title: 'New Note ' + (this.notes.length + 1),
                content: '**Hi!** This notebook is using [markdown] (https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for formatting!',
                created: time,
                favorite: false
            }

            this.notes.push(note);
        },
        removeNote() {
            if (this.selectedNote && confirm('Delete the note?')) {
                const index = this.notes.indexOf(this.selectedNote);
                if (index !== -1) {
                    this.notes.splice(index, 1);
                }
            }
        },
        selectNote(note) {
            this.selectedId = note.id;
        },
        //simpan array of notes ke dalam bentuk string
        saveNotes() {
            localStorage.setItem('notes', JSON.stringify(this.notes));
            console.log('Notes saved!', new Date());
        },
        favoriteNote() {
            this.selectedNote.favorite = !this.selectedNote.favorite
        }
    },
    watch: {
        notes: 'saveNotes',
        // We need this to watch each note's properties inside the array
        deep: true,
        selectedId(val) {
            localStorage.setItem('selected-id', val);
        },
    }

});