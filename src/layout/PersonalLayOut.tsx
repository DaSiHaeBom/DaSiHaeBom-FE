import type { ReactNode } from 'react';
import { PersonalHeader } from '../components/PersonalHeader';
import PersonalSidebar from '../components/PersonalSidebar';

interface LayoutProps {
  children: ReactNode;
}

//여기에 사이드바를 만들어주면 된다.

const PersonalLayout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full h-[100vh]">
      {/* 여기에 사이드바 컴포넌트를 추가할 수 있습니다. */}
      <PersonalSidebar />
      <div className="ml-28">
        <PersonalHeader />
        {children}
      </div>
    </div>
  );
};

export default PersonalLayout;
