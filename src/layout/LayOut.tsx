import type { ReactNode } from 'react';
import { Header } from '../components/Header';

interface LayoutProps {
  children: ReactNode;
}

//여기에 사이드바를 만들어주면 된다.

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full h-[100vh]">
      {/* 여기에 사이드바 컴포넌트를 추가할 수 있습니다. */}
      <Header />
      {children}
    </div>
  );
};

export default Layout;
