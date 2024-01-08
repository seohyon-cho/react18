import './global.scss';
import Post from './Post';

function App() {
	return (
		<div className='App'>
			<Post />
		</div>
	);
}

export default App;

/*
	React18 에서의 Suspense를 활용한 컴포넌트 렌더링의 동기화 처리 
	- 각 페이지에 구성되어 있는 컴포넌트들을 동시에 호출하는 것이 아닌, 영역 별로 렌더링 시점을 동기화 처리 
	- 이전 버전까지는 클라이언트 컴포넌트에서만 제한적으로 동작되는 기능이었지만, 18버전에서부터는, SSR 방식의 컴포넌트에서도 활용 가능하도록 개선됨. 

	활용 예시 : 비동기 데이터를 활용하는 컴포넌트의 경우, 비동기 데이터의 fetching이 완료될 때까지 해당 비동기 데이터 관련 컴포넌트의 렌더링을 시작하지 않으면서, Suspense가 Promise의 상태값을 감시함. 
	Promise가 fulfilled 또는 rejected 상태로 전환되면, 동기적으로 해당 데이터를 활용하는 컴포넌트를 렌더링. 

	활용 예시 : 비동기 데이터의 pending 상태가 길어질 때에는, 대신 fallback이라는 prop을 사용하여 정적인 UI를 대신 호출할 수 있음. (로딩 바 같은..)

	

	useTransition : 똑같이 동시에 호출은 하되, 우선순위만 달리.. 덜 중요한 건 나중에 연산되도록 (비동기)

	Suspense : fetching이 완료될 때까지는, 아예 호출 자체를 안 함. 

	[ useTransition 과 Suspense 차이점 ]
	- useTransition 은, 컴포넌트 간의 동기화 처리가 아닌, 동시에 실행되는 비동기 방식임. startTransition으로 묶어놓은 연산이 우선 순위가 밀리는 것뿐임. 

	- Suspense 는, 해당 컴포넌트에서 관리하는 promise 데이터의 상태값을 실시간으로 감시하면서, pending이 끝날 때 동기적으로 컴포넌트를 호출함. 


	[ Suspense 를 사용하기 위한 조건 ]
	: Suspense 로 동기화시키는 컴포넌트 내부에, Promise 객체의 상태변화를 추적할 수 있는 로직이 구현되어 있어야 함. (fulfilled, rejected 등을 체크할 수 있는..)

	*/
