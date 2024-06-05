import { useState } from 'react';

export type Comment = {
	postId: number;
	id: number;
	name: string;
	email: string;
	body: string;
};

type Props = {
	comment: Comment;
};

const CommentBlock = ({ comment }: Props) => {
	const [isBodyVisible, setBodyVisible] = useState(false);

	return (
		<div className="comment-block">
			<span onClick={() => setBodyVisible((prev) => !prev)}>
				{comment.id}: {comment.name}
			</span>
			{isBodyVisible && <div>{comment.body}</div>}
		</div>
	);
};

export default CommentBlock;
