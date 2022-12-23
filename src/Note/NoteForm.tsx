import { FormEvent, useRef, useState } from 'react'
import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import CreatableSelect from 'react-select/creatable'
import { Note, NoteData, Tag } from '@appTypes/note-types'
import { v4 as uuidV4 } from 'uuid'
import { Link, useNavigate } from 'react-router-dom'

type NoteFormProps = {
	onSubmit: (data: NoteData) => void
	onAddTag: (data: Tag) => void
	availableTags: Tag[]
} & Partial<NoteData>

export const NoteForm = ({
	onSubmit,
	onAddTag,
	availableTags,
	title = '',
	markdown = '',
	tags = [],
}: NoteFormProps) => {
	const titleRef = useRef<HTMLInputElement>(null)
	const markdownRef = useRef<HTMLTextAreaElement>(null)
	const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
	const navigate = useNavigate()

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault()
		onSubmit({
			title: titleRef.current!.value,
			markdown: markdownRef.current!.value,
			tags: selectedTags,
		})

		navigate('..')
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Stack gap={4}>
				<Row>
					<Col>
						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control required ref={titleRef} defaultValue={title} />
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="tags">
							<Form.Label>Tags</Form.Label>
							<CreatableSelect
								isMulti
								value={selectedTags.map((tag) => {
									return { label: tag.label, value: tag.id }
								})}
								options={availableTags.map((tag) => {
									return { label: tag.label, value: tag.id }
								})}
								onCreateOption={(label) => {
									const newTag = { label: label, id: uuidV4() }
									onAddTag(newTag)
									setSelectedTags((prev) => [...prev, newTag])
								}}
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
				<Form.Group controlId="markdown">
					<Form.Label>body</Form.Label>
					<Form.Control
						required
						as="textarea"
						ref={markdownRef}
						rows={15}
						defaultValue={markdown}
					/>
				</Form.Group>
				<Stack direction="horizontal" gap={2} className="justify-content-end">
					<Button type="submit" variant="primary">
						Save
					</Button>
					<Link to={'/'}>
						<Button variant="outline-secondary">Cancel</Button>
					</Link>
				</Stack>
			</Stack>
		</Form>
	)
}
