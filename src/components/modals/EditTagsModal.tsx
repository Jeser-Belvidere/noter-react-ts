import { Tag } from '@/types/note-types'
import { Button, Col, Form, Modal, Row, Stack } from 'react-bootstrap'

type EditTagsModalProps = {
	isShow: boolean
	tags: Tag[]
	handleClose: () => void
	handleDeleteTag: (id: string) => void
	handleUpdateTag: (id: string, label: string) => void
}

export const EditTagsModal = ({
	isShow,
	tags,
	handleClose,
	handleDeleteTag,
	handleUpdateTag,
}: EditTagsModalProps) => {
	return (
		<Modal show={isShow} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Edit tags</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Stack gap={2}>
						{tags.map((tag) => (
							<Row key={tag.id}>
								<Col>
									<Form.Control
										type="text"
										value={tag.label}
										onChange={(e) => handleUpdateTag(tag.id, e.target.value)}
									/>
								</Col>
								<Col xs="auto">
									<Button
										variant="outline-danger"
										onClick={() => handleDeleteTag(tag.id)}
									>
										&times;
									</Button>
								</Col>
							</Row>
						))}
					</Stack>
				</Form>
			</Modal.Body>
		</Modal>
	)
}
