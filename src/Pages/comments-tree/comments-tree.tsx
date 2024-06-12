import { useRef, useState } from 'react';

type CommentType = {
	id: string;
	author: string;
	content: string;
	replies: CommentType[];
};

const comments: CommentType[] = [
	{
		id: '1',
		author: 'Alice',
		content: 'This is the first comment.',
		replies: [
			{
				id: '2',
				author: 'Bob',
				content: 'This is a reply to the first comment.',
				replies: [
					{
						id: '3',
						author: 'Charlie',
						content: "This is a reply to Bob's comment.",
						replies: [],
					},
					{
						id: '4',
						author: 'Dave',
						content: "This is another reply to Bob's comment.",
						replies: [],
					},
				],
			},
			{
				id: '5',
				author: 'Eve',
				content: 'This is another reply to the first comment.',
				replies: [],
			},
			{
				id: '9',
				author: 'Alice',
				content: 'This is yet another reply to the first comment.',
				replies: [
					{
						id: '10',
						author: 'Bob',
						content: "This is a reply to Alice's second comment.",
						replies: [
							{
								id: '11',
								author: 'Charlie',
								content: "This is a reply to Bob's second comment.",
								replies: [],
							},
							{
								id: '12',
								author: 'Dave',
								content: "This is another reply to Bob's second comment.",
								replies: [],
							},
						],
					},
				],
			},
		],
	},
	{
		id: '6',
		author: 'Frank',
		content: 'This is a separate comment.',
		replies: [
			{
				id: '7',
				author: 'Grace',
				content: "This is a reply to Frank's comment.",
				replies: [
					{
						id: '8',
						author: 'Heidi',
						content: "This is a reply to Grace's comment.",
						replies: [],
					},
				],
			},
			{
				id: '13',
				author: 'Ivan',
				content: "This is another reply to Frank's comment.",
				replies: [
					{
						id: '14',
						author: 'Judy',
						content: "This is a reply to Ivan's comment.",
						replies: [],
					},
				],
			},
		],
	},
	{
		id: '15',
		author: 'Mallory',
		content: 'This is a new separate comment.',
		replies: [
			{
				id: '16',
				author: 'Niaj',
				content: "This is a reply to Mallory's comment.",
				replies: [
					{
						id: '17',
						author: 'Olivia',
						content: "This is a reply to Niaj's comment.",
						replies: [],
					},
				],
			},
			{
				id: '18',
				author: 'Peggy',
				content: "This is another reply to Mallory's comment.",
				replies: [],
			},
		],
	},
];

const findCommentByIdIterative = (comments: CommentType[], id: string): CommentType | null => {
	const queue = [...comments];

	while (queue.length) {
		const comment = queue.shift();

		if (!comment) continue;

		if (comment.id === id) return comment;

		queue.push(...comment.replies);
	}

	return null;
};

// const findCommentByIdRecursive = (comment: CommentType, id: string): CommentType | null => {
// 	if (!comment) return null;
// 	if (comment.id === id.trim()) return comment;

// 	for (const reply of comment.replies) {
// 		const foundComment = findCommentById(reply, id);
// 		if (foundComment) return foundComment;
// 	}

// 	return null;
// };

export default function CommentsTree() {
	const inputRef = useRef<HTMLInputElement>(null);
	const [searchedComment, setSearchComment] = useState<CommentType | null>();

	const handleSearch = () => {
		if (!inputRef.current) return;

		// const commentTree = { id: '0', content: '', author: '', replies: comments };
		// const data = findCommentByIdRecursive(commentTree, String(inputRef.current.value));

		const data = findCommentByIdIterative(comments, String(inputRef.current.value));
		setSearchComment(data);
	};

	return (
		<>
			<input ref={inputRef} type="number" />
			<button onClick={handleSearch}>Search</button>
			<h3>Comments</h3>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
					rowGap: '10px',
				}}>
				{searchedComment && searchedComment.id !== '0' ? (
					<Comment key={searchedComment.id} comment={searchedComment} depth={1} />
				) : (
					comments.map((comment) => <Comment key={comment.id} comment={comment} depth={1} />)
				)}
			</div>
		</>
	);
}

type CommentsProps = {
	comment: CommentType;
	depth: number;
};

function Comment({ comment, depth }: CommentsProps) {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'flex-start',
				rowGap: '10px',
			}}>
			<div>{comment.author}</div>
			<div>{comment.content}</div>
			{comment.replies.map((comment) => (
				<div key={comment.id} style={{ paddingLeft: `${depth * 10}px` }}>
					<Comment comment={comment} depth={depth + 1} />
				</div>
			))}
		</div>
	);
}
