import { useEffect } from 'react';

const checkPromiseStatus = (promise) => {
	console.log(promise);
};

const useGetData = (url) => {
	useEffect(() => {
		const getData = (url) => {
			const promise = fetch(url).then((data) => data.json());
			checkPromiseStatus(promise);
		};

		getData();
	}, []);
};

export default useGetData;
