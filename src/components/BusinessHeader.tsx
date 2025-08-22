import logo from '../assets/logo.svg';

export const BusinessHeader = () => {
  return (
    <div className="top-0 flex justify-between items-center w-full px-4 bg-white h-16 z-10">
      <img src={logo} alt="logo" className="w-10 h-10" />
      <p className="text-lg">Profile</p>
    </div>
  );
};
