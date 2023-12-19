import './App.css'

import { Link,Outlet } from 'react-router-dom';

function App() {

  return (
    <>
      <h1>Main Page</h1>
      <div>Ramos의 React + TypeScript 삽질</div>
      <div>
        <Link to='/example1'>example1 페이지</Link>
      </div>
      <Outlet />
      <div>
        <Link to='/example2'>example2 페이지</Link>
      </div>
    </>
  )
}

export default App
