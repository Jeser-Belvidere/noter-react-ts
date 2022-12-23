import { NoteForm } from '@/Note/NoteForm'
import { NoteData, Tag } from '@appTypes/note-types'

type newNoteProps = {
	onSubmit: (data: NoteData) => void
	onAddTag: (data: Tag) => void
	availableTags: Tag[]
}

export const NewNote = ({ onSubmit, onAddTag, availableTags }: newNoteProps) => {
	return (
		<>
			<h1 className="mb-4">New Note</h1>
			<NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} />
		</>
	)
}
