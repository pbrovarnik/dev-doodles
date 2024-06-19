import useFetch from '../../hooks/useFetch';

export default function Home() {
	const data = useFetch({ defaultData: '', url: 'https://pashginx.onrender.com/api/v1' });
	console.log('data', data);
	return (
		<div>
			<h1>Welcome to the world of DevDoodles!</h1>
			<p>(Page is under construction)</p>
		</div>
	);
}
