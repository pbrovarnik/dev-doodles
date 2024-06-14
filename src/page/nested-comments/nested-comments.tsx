import { useMemo, useState } from 'react';
import PostsList from './components/PostsList';
import { Comment } from './components/CommentBlock';
import { Post } from './components/PostBlock';
import useFetch from '../../hooks/useFetch';

import './nested-comments.css';

function App() {
	const { data: postsData, error: postsError, isLoading: postsLoading } = useFetch<Post[]>({ url: 'https://jsonplaceholder.typicode.com/posts', defaultData: [] });
	const { data: commentsData, error: commentsError, isLoading: commentsLoading } = useFetch<Comment[]>({ url: 'https://jsonplaceholder.typicode.com/comments', defaultData: [] });

	const [query, setQuery] = useState('');

	const filteredPosts = useMemo(() => {
		const postsWithComments = postsData.reduce((prevPosts: Post[], currPost) => {
			prevPosts.push({
				...currPost,
				comments: commentsData.filter((comment) => comment.postId === currPost.id),
			});

			return prevPosts;
		}, []);

		const filterPostsByQuery = (stringToFilterBy: string) => stringToFilterBy.toLowerCase().includes(query.toLowerCase());

		return postsWithComments.filter((post) => filterPostsByQuery(post.title) || filterPostsByQuery(post.body) || filterPostsByQuery(post.id.toString()));
	}, [commentsData, postsData, query]);

	if (commentsLoading || postsLoading) return <div>loading...</div>;

	if (commentsError || postsError) return <div>there was an error.</div>;

	return (
		<div className="app">
			<input value={query} onChange={(e) => setQuery(e.target.value)} />
			<PostsList posts={filteredPosts} />
		</div>
	);
}

export default App;
