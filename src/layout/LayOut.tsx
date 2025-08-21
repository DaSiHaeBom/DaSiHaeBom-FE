import type { ReactNode } from 'react';
import { Header } from '../components/Header';
import PersonalSidebar from '../components/PersonalSidebar';
import BusinessSidebar from '../components/BusinessSidebar';

interface LayoutProps {
  children: ReactNode;
}

//여기에 사이드바를 만들어주면 된다.

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full h-[100vh]">
      {/* 여기에 사이드바 컴포넌트를 추가할 수 있습니다. */}
      <BusinessSidebar />
      <PersonalSidebar />
      <div className="ml-28">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Layout;
