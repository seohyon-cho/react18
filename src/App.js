import News from './components/news/News';
import Pics from './components/pics/Pics';
import Visual from './components/visual/Visual';
import './global.scss';

function App() {
	return (
		<div className='App'>
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
