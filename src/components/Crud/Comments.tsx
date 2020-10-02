import React, { useState, useEffect, useContext } from 'react';
import UserStore from '../../stores/userStore';
import { GET_TODO_COMMENTS } from '../../config/config';
import CommentModal from './CommentModal';

type Props = {
    id: number;
}

export interface Comment {
    commentText: string;
    personId: number;
    personName: string;
    posted: string;
    todoCommentId: number;
}

export interface Comments extends Array<Comment>{}

const Comments = ({ id }: Props) => {
    const [data, setData] = useState<Comments>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const userStore = useContext(UserStore);
    const [commentsLen, setCommentsLen] = useState<number>(0);
    const [show, setShow] = useState<boolean>(false);
    const [commentAdded, setCommentAdded] = useState<boolean>(false);


    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const response = await fetch(`${GET_TODO_COMMENTS}/${id}`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${userStore.jwt}`
                }
            })
            const data = await response.json();

            setData(data);
            setCommentsLen(data.length);
            setIsLoading(false);
        }
        catch (error) {
            console.log(error);
        }
    }

    console.log(data);

    return (
        <>
            <div>
                <p onClick={() => setShow(true)} className='comment-link'>{commentsLen} kommentarer</p>
            </div>
            {
                show ? <CommentModal id={id} data={data} show={show} setShow={setShow} commentAdded={commentAdded} setCommentAdded={setCommentAdded} /> : null
            }
            
        </>
    )
}



export default Comments;
