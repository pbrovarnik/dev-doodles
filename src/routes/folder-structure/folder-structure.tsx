import { useState } from 'react';

const files = {
	children: [
		{
			name: 'project',
			children: [
				{
					name: 'src',
					children: [
						{
							name: 'components',
							children: [
								{
									name: 'Header.js',
									children: [],
								},
								{
									name: 'Footer.js',
									children: [],
								},
							],
						},
						{
							name: 'utils',
							children: [
								{
									name: 'helpers.js',
									children: [],
								},
							],
						},
						{
							name: 'index.js',
							children: [],
						},
					],
				},
				{
					name: 'public',
					children: [
						{
							name: 'images',
							children: [
								{
									name: 'logo.png',
									children: [],
								},
							],
						},
						{
							name: 'css',
							children: [
								{
									name: 'styles.css',
									children: [],
								},
								{
									name: 'theme.css',
									children: [],
								},
							],
						},
						{
							name: 'index.html',
							children: [],
						},
						{
							name: 'robots.txt',
							children: [],
						},
					],
				},
				{
					name: 'docs',
					children: [
						{
							name: 'api',
							children: [
								{
									name: 'api-docs.md',
									children: [],
								},
								{
									name: 'endpoints.md',
									children: [],
								},
								{
									name: 'authentication.md',
									children: [],
								},
							],
						},
						{
							name: 'guides',
							children: [],
						},
						{
							name: 'readme.md',
							children: [],
						},
					],
				},
				{
					name: 'package.json',
					children: [],
				},
				{
					name: 'webpack.config.js',
					children: [],
				},
			],
		},
	],
};

export default function FolderStructure() {
	const [expandedFolders, setExpandedFolders] = useState<{ [key: string]: boolean }>({});

	const toggleFileVisibility = (fileName: string) => {
		setExpandedFolders((prevState) => ({
			...prevState,
			[fileName]: !prevState[fileName],
		}));
	};

	const handleBtnClick = () => {
		setExpandedFolders({});
	};

	return (
		<div style={{ width: '200px', margin: '0 auto' }}>
			<button onClick={handleBtnClick}>Collapse</button>
			<FileSystem files={files.children} depth={1} parentFolder="root" expandedFolders={expandedFolders} toggleFileVisibility={toggleFileVisibility} />
		</div>
	);
}

type File = {
	name: string;
	children: File[];
};

type FileSystemProps = {
	files: File[];
	depth: number;
	parentFolder: string;
	expandedFolders: { [key: string]: boolean };
	toggleFileVisibility: (fileName: string) => void;
};

function FileSystem({ files, depth, parentFolder, expandedFolders, toggleFileVisibility }: FileSystemProps) {
	return (
		<div>
			{files.map((file, idx) => (
				<File key={idx} file={file} depth={depth} parentFolder={parentFolder} expandedFolders={expandedFolders} toggleFileVisibility={toggleFileVisibility} />
			))}
		</div>
	);
}

type FileProps = {
	file: File;
	depth: number;
	parentFolder: string;
	expandedFolders: { [key: string]: boolean };
	toggleFileVisibility: (fileName: string) => void;
};

function File({ file, depth, parentFolder, expandedFolders, toggleFileVisibility }: FileProps) {
	const fileId = `${parentFolder}_${file.name}`;
	const isFolderExpanded = expandedFolders[fileId] || false;

	return (
		<>
			<div>
				{!!file.children.length && (
					<span style={{ cursor: 'pointer', marginRight: '4px' }} onClick={() => toggleFileVisibility(fileId)}>
						{isFolderExpanded ? '-' : '+'}
					</span>
				)}
				{file.name}
			</div>
			<div style={{ display: isFolderExpanded ? 'block' : 'none', paddingLeft: `${depth * 10}px` }}>
				<FileSystem files={file.children} depth={depth + 1} parentFolder={fileId} expandedFolders={expandedFolders} toggleFileVisibility={toggleFileVisibility} />
			</div>
		</>
	);
}
