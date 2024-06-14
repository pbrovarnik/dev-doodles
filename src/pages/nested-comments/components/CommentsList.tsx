import { Comment } from './CommentBlock';
import CommentBlock from './CommentBlock';

type Props = {
	comments: Comment[];
};

const CommentsList = ({ comments }: Props) => {
	return (
		<div className="comments-list">
			{comments.map((comment, i) => (
				<CommentBlock key={i} comment={comment} />
			))}
		</div>
	);
};

export default CommentsList;
