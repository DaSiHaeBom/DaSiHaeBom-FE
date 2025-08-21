import Spinning from '../../components/loading/Spining';
const Loading = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      {/* 로고 + 스피너 */}
      <Spinning />
    </div>
  );
};

export default Loading;
