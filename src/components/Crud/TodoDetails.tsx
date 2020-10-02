import React, { useContext, useState } from 'react';

import { useParams, NavLink, useHistory } from 'react-router-dom';
import useFetch from '../../custom-hooks/useFetch';
import Comments from './Comments';
import UserStore from '../../stores/userStore';
import axios from 'axios';

import { AiFillCheckCircle, AiFillClockCircle, AiOutlineLeft } from 'react-icons/ai';

import Button from 'react-bootstrap/Button';

import { TODO_API_ADDRESS, COMPLETE_TODO } from '../../config/config';

// import Utils from '../../utils/Utils';

const TodoDetails = () => {
	const { id } = useParams();
	const [completeTodo, setCompleteTodo] = useState<boolean>(false);
	const userStore = useContext(UserStore);
	const history = useHistory();


	const options = {
		method: 'GET',
		headers: {
			"Authorization": `Bearer  ${userStore.jwt}`
		}
	};

	const postTodoCompleted = async () => {
		userStore.checkIfTokenIsValid();
		axios({
			method: 'put',
			url: `${COMPLETE_TODO}/${id}`,

			headers: {
				Authorization: "Bearer " + userStore.jwt,
			}
		})
			.then(response => {
				console.log(response);
			});

	}

	const OnCompletedTodo = () => {
		postTodoCompleted();

		return setTimeout(() => {
			history.push('/todo');
		}, 400);

	}

	const { data, error, isLoading } = useFetch({ url: `${TODO_API_ADDRESS}/${id}`, options });

	return (
		<div className="main-content-container">
			<div className="todo-list-container detail">
				{
					data && data.map((item: any /*fixa detta */) => {
						return (
							<div className="card todo-details" key={item.todoId}>
								<div className="card-body">
									<div className="card-padded-cont">
										<div className="todo-detail-grid">
											<div className="todo-info">
												<h1>{item.name}</h1>
												{/* <h4>Deadline</h4> */}
												<div className="detail-deadline-parent">
													<div className="detail-deadline"><p><AiFillClockCircle className="clock" size={20} />{item.toBeCompleted.slice(0, 10)}</p></div>
												</div>
												<h4>Beskrivning</h4>

												<p>{item.description}</p>
												<h4>Status</h4>
												<p className={!item.isComplete ? "not-completed" : "completed"}>{!item.isComplete ? "EJ AVSLUTAD" : "AVSLUTAD"}</p>
												<h4>Ansvarig</h4>
												<p>{item.personName}</p>
												<Comments id={id} />


											</div>
										</div>
										{/* end grid */}
										<div>
											<hr />
										</div>

										<div className="button-container">
											<NavLink to="/todo">
												<Button variant="dark"><AiOutlineLeft size={20} />Tillbaka</Button>
											</NavLink>

											{
												!item.isComplete ? (
													<>
														<Button className="set-todo-button" variant={completeTodo ? "success" : "info"} onClick={() => setCompleteTodo(!completeTodo)}>
															{
																completeTodo ? <AiFillCheckCircle
																	style={{ marginLeft: '30px' }}
																	size={25}
																/> : "Göra klar"
															}
														</Button>

													</>
												) : <p>N/A</p>
											}


											{
												!item.isComplete ? (
													<Button disabled={completeTodo ? false : true} onClick={OnCompletedTodo} variant="success" className="set-todo-button">
														SPARA ÄNDRINGAR
													</Button>
												) : null
											}
										
										

										</div>

									</div>
								</div>

							</div>
						)
					})
				}
				{
					isLoading ?
						<div className="todo-list-container">
							<p>laddar *spinner*</p>
						</div>
						: null
				}
			</div>
		</div>
	)

}

export default TodoDetails;
{/* <div className="main-content-container">
                <TodoList searchStr={searchStr} />
                <Message />

            </div> */}