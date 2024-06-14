import { useState } from 'react';
import CommentsList from './CommentsList';
import { Comment } from './CommentBlock';

export type Post = {
	userId: number;
	id: number;
	title: string;
	body: string;
	comments: Comment[];
};

type Props = {
	post: Post;
};

const PostBlock = ({ post }: Props) => {
	const [isBodyVisible, setBodyVisible] = useState(false);

	return (
		<div className="post-block">
			<span onClick={() => setBodyVisible((prev) => !prev)}>
				{post.id}: {post.title}
			</span>
			{isBodyVisible && (
				<>
					<div>{post.body}</div>
					<CommentsList comments={post.comments} />
				</>
			)}
		</div>
	);
};

export default PostBlock;
