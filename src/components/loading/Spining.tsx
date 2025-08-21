import logo from '../../assets/logo.svg';

const Spinning = () => {
  return (
    <div className="relative flex items-center justify-center">
      <div className="w-62 h-62 border-4 border-gray-300 border-t-[#FF6B01] rounded-full animate-spin" />
      <img src={logo} className="absolute w-40 h-40" />
    </div>
  );
};

export default Spinning;
