import { createRoot } from 'react-dom/client';
import App from './App.jsx'; // App 컴포넌트 임포트
import './index.css'; // 전역 스타일 임포트

createRoot(document.getElementById('root')!).render(<App />);
