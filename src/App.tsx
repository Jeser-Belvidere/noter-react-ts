import { useMemo } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import { Routes, Route, Navigate } from 'react-router-dom'
import { NewNote } from './Note/NewNote'
import { Notelist } from './Note/NoteList'
import { NoteLayout } from './Note/NoteLayout'
import { NoteData, RawNote, Tag } from '@appTypes/note-types'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { v4 as uuidV4 } from 'uuid'
import { Note } from './Note/Note'
import { EditNote } from './Note/EditNote'

function App() {
	const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', [])
	const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', [])

	const notesWithTags = useMemo(() => {
		return notes.map((note) => {
			return { ...note, tags: tags.filter((tag) => note.tagIds.includes(tag.id)) }
		})
	}, [notes, tags])

	const onCreateNote = ({ tags, ...data }: NoteData) => {
		setNotes((prevNotes) => {
			return [...prevNotes, { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) }]
		})
	}

	const onUpdateNote = (id: string, { tags, ...data }: NoteData) => {
		setNotes((prevNotes) => {
			return prevNotes.map((note) => {
				if (note.id === id) {
					return { ...note, ...data, tagIds: tags.map((tag) => tag.id) }
				} else {
					return note
				}
			})
		})
	}

	const onDeleteNote = (id: string) => {
		setNotes((prevNotes) => {
			return prevNotes.filter((note) => note.id !== id)
		})
	}

	const addTag = (tag: Tag) => {
		setTags((prev) => [...prev, tag])
	}

	const onUpdateTag = (id: string, label: string) => {
		setTags((prevTags) => {
			return prevTags.map((tag) => {
				if (tag.id === id) {
					return { ...tag, label }
				} else {
					return tag
				}
			})
		})
	}

	const onDeleteTag = (id: string) => {
		setTags((prevTags) => {
			return prevTags.filter((tag) => tag.id !== id)
		})
	}

	return (
		<Container className="my-4">
			<Routes>
				<Route
					path="/"
					element={
						<Notelist
							availableTags={tags}
							notes={notesWithTags}
							updateTag={onUpdateTag}
							deleteTag={onDeleteTag}
						/>
					}
				/>
				<Route
					path="/new"
					element={
						<NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags} />
					}
				/>
				<Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
					<Route index element={<Note onDelete={onDeleteNote} />} />
					<Route
						path="edit"
						element={
							<EditNote
								onSubmit={onUpdateNote}
								onAddTag={addTag}
								availableTags={tags}
							/>
						}
					/>
				</Route>
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</Container>
	)
}

export default App
