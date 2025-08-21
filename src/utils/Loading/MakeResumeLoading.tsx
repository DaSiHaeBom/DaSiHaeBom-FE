import { useState, useEffect } from 'react';
import Spinning from '../../components/loading/Spining';

const messages = [
  'AI가 열심히 생성중이에요...',
  '곧 멋진 결과를 보여드릴게요!',
  '잠시만 기다려 주세요 😊',
];

const Loading = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % messages.length);
    }, 2000); // 2초마다 변경
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      {/* 순차 문구 */}
      <div className="mb-6 text-gray-700 text-lg font-medium transition-opacity duration-500">
        {messages[index]}
      </div>

      {/* 로고 + 스피너 */}
      <Spinning />
    </div>
  );
};

export default Loading;
