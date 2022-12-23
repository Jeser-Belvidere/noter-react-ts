export type Note = {
	id: string
} & NoteData

export type NoteData = {
	title: string
	markdown: string
	tags: Tag[]
}

export type Tag = {
	id: string
	label: string
}

export type Id = {
	id: string
}

export type RawNote = {
	id: string
} & RawNoteData

export type RawNoteData = {
	title: string
	markdown: string
	tagIds: string[]
}

export type simplifiedNote = {
	id: string
	title: string
	tags: Tag[]
}
