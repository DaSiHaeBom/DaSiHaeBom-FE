import { RouterProvider } from 'react-router';
import routes from './utils/routes';

function App() {
  return <RouterProvider router={routes}></RouterProvider>;
}

export default App;
