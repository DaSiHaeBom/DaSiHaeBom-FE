import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const ResumeLayout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 py-4">
      {children}
    </div>
  );
};

export default ResumeLayout;
