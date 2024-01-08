import { useState } from 'react';
import News from './components/news/News';
import Pics from './components/pics/Pics';
import Visual from './components/visual/Visual';
import './global.scss';
import { flushSync } from 'react-dom';

function App() {
	console.log('re-render');
	const [Count1, setCount1] = useState(1);
	const [Count2, setCount2] = useState(2);
	const [Count3, setCount3] = useState(3);

	const returnPromise = () => {
		return new Promise((res) => setTimeout(res, 500));
	};

	const changeState = () => {
		returnPromise().then(() => {
			// flushSync : 특정 state값을 Auto Batching에서 제외 처리
			flushSync(() => {
				setCount1(Count1 + 1);
			});
			setCount2(Count2 + 1);
			setCount3(Count3 + 1);
		});
	};

	return (
		<div className='App'>
			<button onClick={changeState}>변경</button>
			<h1>
				{Count1}-{Count2}-{Count3}
			</h1>
			<Visual />
			<News />
			<Pics />
		</div>
	);
}
export default App;

/*
  [ Automatic Batching ]
  : 여러 개의 state 가 하나의 핸들러 함수 안에서 동시에 변경이 될 때, 그룹으로 묶어서 한 번만 렌더링 처리가 되도록 하는 것. 
    * ( 리액트 17에서도 Batching 기능이 동작되긴 하나, 만약 Promise를 반환하는 핸들러 함수 안쪽에서 여러 개의 state가 변경이 되면 동작이 되지 않았음. )
*/
