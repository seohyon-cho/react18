const getData = async () => {
	const promise = await fetch('https://jsonplaceholder.typicode.com/posts');
	console.log(promise);
};

export default getData;
