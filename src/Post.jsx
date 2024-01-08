import useGetData from './useGetData';
console.log(useGetData);

export default function Post() {
	useGetData('https://jsonplaceholder.typicode.com/posts');

	return <div className='Post'>Post</div>;
}
