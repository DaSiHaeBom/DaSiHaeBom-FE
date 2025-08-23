import type { ReactNode } from 'react';
import { BusinessHeader } from '../components/BusinessHeader';
import BusinessSidebar from '../components/BusinessSidebar';

interface LayoutProps {
  children: ReactNode;
}

//여기에 사이드바를 만들어주면 된다.

const BusinessLayout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full h-[100vh]">
      {/* 여기에 사이드바 컴포넌트를 추가할 수 있습니다. */}
      <BusinessSidebar />
      <div className="ml-28">
        <BusinessHeader />
        {children}
      </div>
    </div>
  );
};

export default BusinessLayout;
