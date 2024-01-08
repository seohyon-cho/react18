import { useState, useTransition } from 'react';
import './global.scss';

function App() {
	const [Count, setCount] = useState(0);
	const [Items, setItems] = useState([]);
	const [isPending, startTransition] = useTransition();
	console.log(isPending);

	/* 
	하나의 핸들러 함수 안쪽에, 화면의 재렌더링을 담당하는 두 개의 state가 있음.
	- (예)
	- Count : 중요한 정보값, 빠르게 연산 가능한 값.
	- Items : 상대적으로 덜 중요한 정보값, 연산이 오래 걸리는 값.
	- 기존에 useTransition이 없을 때에는, 덜 중요한 정보값인 Items의 연산이 끝나지 않았다는 이유로, 상대적으로 빠르게 처리할 수 있는 Count 값까지 화면에 늦게 출력 됨. 
	- 따라서 사용자는 무거운 연산을 필요로 하는 state가 만들어질 때까지 갱신된 화면을 늦게 볼 수밖에 없음. 
	*/

	// 아래 함수에서는, 덜 중요하고 무거운 연산 때문에 급하고 중요한 연산까지 덩달아 늦게 화면에 렌더링 됨.
	const handleClick = () => {
		// 급하게 처리해야 할 중요한 연산 : urgent op
		setCount(Count + 1);

		// 시간이 많이 걸리고 우선순위가 떨어지는 덜 중요한 연산 : not urgent op
		// 우선순위가 떨어지는 연산 구문을 startTransition에 콜백함수로 전달.
		startTransition(() => {
			const arr = Array(20000)
				.fill(1)
				.map((_, idx) => Count + idx);

			setItems(arr);
		});
	};

	return (
		<div className='App'>
			{/* 버튼을 클릭할 때마다, Count값만 먼저 연산이 일어나서, 부분적으로 중요한 버튼 내용 먼저 갱신 */}
			{/* 초기 로딩 시, 굳이 연산이 오래 걸리지 않는 컨텐츠를 미리 화면에 띄워줌.  */}
			{/* isPending 값을 이용해서, startTransition으로 실행되는 무거운 연산이 끝났을 때 다시 이벤트 호출이 가능하게끔 처리 */}
			<button onClick={handleClick} disabled={isPending}>
				{Count}
			</button>
			<ul>
				{/* startTransition으로 우선순위를 뒤로 빼놓은 Items 값은, 뒷순위로 연산처리됨.  */}
				{Items.map((num) => (
					<li key={num}>{num}</li>
				))}
			</ul>
		</div>
	);
}

export default App;

/*
	useTransition
	: 컴포넌트 렌더링 시, 연산에 우선순위를 두어서, 늦게 렌더링해도 될 것들을 선별하여 지정. 

		* ( 기존 17버전에서는, 한 번 렌더링 연산이 시작되면, 중간에 멈추는 것이 불가능했음. )
			: 특정 핸들러 함수에 의해서 화면을 재연산해야 하는 경우, 중간에 무거운 로직이 실행되는 연산이 있다면, 굳이 무거운 연산이 필요없는 컴포넌트까지 같이 지연이 일어나게 되면서 전반적인 로딩 속도에 악영향을 끼쳤음.


	useTransition을 주로 사용하는 사례 (hydration 처리할 때)
	: 굳이 데이터 fetching이 필요없는 정적인 컨텐츠를 먼저 빠르게 화면에 출력하고나서, 서버나 외부 API에서 불러와야 하는 비동기 데이터를 나중에 선별적으로 호출할 때


	[ 프론트엔드 개발에 따른 화면 렌더링 연산 흐름의 변화 ]
	- 예전 SSR (Server Side Rendering) 작업 방식 (HTML, CSS, jQuery, ajax)
	1. 처음에 서버로부터 HTML 파일을 가져옴. 
	2. 추후, 동적 데이터가 필요할 때마다 다시 서버쪽에 요청을 해서 전체 화면을 다시 Full load (화면 깜빡임 발생) (jQuery 등장 전까지)
	3. 이후 jQuery Ajax기능을 사용할 수 있게 됨에 따라 전체 화면을 다시 full load 하지 않고, 필요한 데이터만 실시간 호출 가능. 
	4. 비동기 데이터를 jQuery를 이용해서 일일이 동적 DOM을 생성해야 하는 번거로움이 생김. 


	# 리액트를 활용한 CSR (Client Side Rendering) 방식 등장 (React17)
	1. 아무 것도 없는 빈 HTML 파일을 브라우저가 서버로부터 호출.
	2. 자바스크립트(리액트) 파일을 로드 (React 담당)
	3. 리액트 컴포넌트 로드 (useEffect에 의해서 data fetching 시작)
	4. 컴포넌트 해석 후, 렌더링 시작
	5. 최종 화면에 data fetching까지 적용된 동적 DOM 화면이 출력됨. (이 상태에 도달하기까지 사용자는 빈화면을 보고 있게 됨.)


	# 리액트 18버전에서의 SSR & CSR 작업 흐름 (React18)
	1. 서버 쪽에서 미리 static하게 프리렌더링된 HTML 파일자체를 가져옴. 
	2. 동적으로 바뀔 필요가 없는 정적인 데이터를 미리 서버쪽에서 HTML파일 형태로 만들어 준비해두었다가, URL 입력이 들어오면 미리 완성된 HTML파일을 전송해줌.
	3. 리액트 관련 자바스크립트 파일을 로드함. 
	4. 미리 프리렌더된 정적인 컨텐츠를 먼저 출력을 해둔 상태에서, 동적 데이터를 다루는 컴포넌트 해석 
	5. 동적 데이터가 해석되면, 기존의 정적 페이지에 동적 데이터를 기반으로 한 컨텐츠를 부드럽게 호출 (Hydration)


	# Next.js 에서의 작업 흐름
	1. 클라이언트 컴포넌트 / 서버 컴포넌트로 분리되어있음. 
	2. 기본적으로 모든 컴포넌트는 서버 컴포넌트로 구현됨. (미리 서버쪽에서 정적인 데이터를 바탕으로 해서 pre-render된 HTML파일을 바로 전달해주는 방식.)
	3. 미리 어느정도 데이터가 있는 형태로 일단은 SSR방식으로 출력함. 
	4. 추후 사용자 이벤트에 의해서 동적 데이터를 가져올 확률이 있는 컨텐츠는, 클라이언트 컴포넌트로 제작함. 
*/
