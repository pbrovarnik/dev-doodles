import { Post } from './PostBlock';
import PostBlock from './PostBlock';

type Props = {
	posts: Post[];
};

const PostsList = ({ posts }: Props) => {
	return (
		<div className="posts-list">
			{posts.map((post, i) => (
				<PostBlock key={i} post={post} />
			))}
		</div>
	);
};

export default PostsList;
