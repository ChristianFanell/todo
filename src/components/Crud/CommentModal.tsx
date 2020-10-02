import React, { useState, useEffect, useContext } from 'react';

import { Button, Modal, Row, Col, Container } from 'react-bootstrap';
import { Comments, Comment } from './Comments';
import { ADD_TODO_COMMENT } from '../../config/config';
import axios from 'axios';
import UserStore from '../../stores/userStore';

type State = {
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
	setCommentAdded: React.Dispatch<React.SetStateAction<boolean>>;
	show: boolean;
	data: Comments;
	commentAdded: boolean;
	id: number;
}

type Data = {
	id: number;
	personId: number;
	commentText: string;
	posted: Date;
}

const CommentModal = ({ id, data, show, setShow, commentAdded, setCommentAdded }: State) => {
	const [newComment, setNewComment] = useState<string | null>(null);
	const [fetchError, setFetchError] = useState<string | null>();
	const userStore = useContext(UserStore);
	
	userStore.setUserId();

	const handleClose = () => {
		setShow(false);
	}

	const fixDate = () => {
		return new Date();
	}

	const handleSubmit = () => {
		axios({
			method: 'post',
			url: ADD_TODO_COMMENT,
			data: {
				id,
				personId: userStore.userId,
				commentText: newComment,
				posted: fixDate()

			},
			headers: {
				Authorization: "Bearer " + userStore.jwt
			}
		})
			.then(response => {
				if (response.data.message) {
					setFetchError(response.data.message)
				}
				else {

				}
			});
		setCommentAdded(!commentAdded);
	}

	useEffect(() => {

	}, [commentAdded])

	const handleChange = (e: any) => {
		let { value } = e.target;

		setNewComment(value);
	}



	return (
		<Modal show={show} onHide={handleClose} animation={false}>
			<Modal.Header closeButton>
				<Modal.Title>Åtgärder/förslag</Modal.Title>
			</Modal.Header>
			<Modal.Body>

				<div className="comment-section">
					{
						data.length > 0 ? data.map((comment: Comment) => {
							return (
								<div key={comment.todoCommentId} className="comment">
									<p>{comment.commentText}</p>
									<p>Av {comment.personName}</p>
									<p>{comment.posted}</p>

									<hr />
								</div>
							)
						}) : <p>0 kommentarer</p>
					}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<div onChange={handleChange} className='add-comment'>
					<textarea placeholder="Din åtgärd" name="comment" rows={4} cols={50}></textarea>
				</div>
				<Button variant="secondary" onClick={handleClose}>
					Avbryt
          </Button>
				<Button variant="primary" onClick={handleClose}>
					Lägg till kommentar
          </Button>
			</Modal.Footer>
		</Modal>
	)
}

export default CommentModal;

