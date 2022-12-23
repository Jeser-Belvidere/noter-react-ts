import { NoteForm } from '@/Note/NoteForm'
import { NoteData, Tag } from '@appTypes/note-types'
import { useNote } from './NoteLayout'

type EditNoteProps = {
	onSubmit: (id: string, data: NoteData) => void
	onAddTag: (data: Tag) => void
	availableTags: Tag[]
}

export const EditNote = ({ onSubmit, onAddTag, availableTags }: EditNoteProps) => {
	const note = useNote()
	return (
		<>
			<h1 className="mb-4">Edit Note</h1>
			<NoteForm
				title={note.title}
				tags={note.tags}
				markdown={note.markdown}
				onSubmit={(data) => onSubmit(note.id, data)}
				onAddTag={onAddTag}
				availableTags={availableTags}
			/>
		</>
	)
}
