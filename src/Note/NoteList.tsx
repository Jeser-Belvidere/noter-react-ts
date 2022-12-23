import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import ReactSelect from 'react-select'
import { Tag, simplifiedNote } from '@/types/note-types'
import { NoteCard } from '@/components/note-card/NoteCard'
import { EditTagsModal } from '@/components/modals/EditTagsModal'

type NoteListProps = {
	availableTags: Tag[]
	notes: simplifiedNote[]
	deleteTag: (id: string) => void
	updateTag: (id: string, label: string) => void
}

export function Notelist({ availableTags, notes, deleteTag, updateTag }: NoteListProps) {
	const [selectedTags, setSelectedTags] = useState<Tag[]>([])
	const [title, setTitle] = useState('')
	const [EditTagsModalIsOpen, setEditTagsModalIsOpen] = useState(true)

	const filteredNotes = useMemo(() => {
		return notes.filter((note) => {
			return (
				(title === '' || note.title.toLowerCase().includes(title.toLowerCase())) &&
				(selectedTags.length === 0 ||
					selectedTags.every((tag) => note.tags.some((noteTag) => noteTag.id === tag.id)))
			)
		})
	}, [title, selectedTags, notes])
	return (
		<>
			<Row className="align-items-center mb-4">
				<Col>
					<h1>Notes</h1>
				</Col>
				<Col xs="auto">
					<Stack gap={2} direction="horizontal">
						<Link to={'/new'}>
							<Button variant="primary">Create</Button>
						</Link>
						<Button
							variant="outline-secondary"
							onClick={() => setEditTagsModalIsOpen(true)}
						>
							Edit tags
						</Button>
					</Stack>
				</Col>
			</Row>
			<Form>
				<Row className="mb-4">
					<Col>
						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.title)}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="tags">
							<Form.Label>Tags</Form.Label>
							<ReactSelect
								isMulti
								value={selectedTags.map((tag) => {
									return { label: tag.label, value: tag.id }
								})}
								options={availableTags.map((tag) => {
									return { label: tag.label, value: tag.id }
								})}
								onChange={(tags) => {
									setSelectedTags(
										tags.map((tag) => {
											return { label: tag.label, id: tag.value }
										}),
									)
								}}
							/>
						</Form.Group>
					</Col>
				</Row>
			</Form>
			<Row xs={1} md={2} lg={3} xl={4} className="g-3">
				{filteredNotes.map((note) => (
					<Col key={note.id}>
						<NoteCard id={note.id} title={note.title} tags={note.tags} />
					</Col>
				))}
			</Row>
			<EditTagsModal
				isShow={EditTagsModalIsOpen}
				tags={availableTags}
				handleClose={() => setEditTagsModalIsOpen(false)}
				handleDeleteTag={deleteTag}
				handleUpdateTag={updateTag}
			/>
		</>
	)
}
