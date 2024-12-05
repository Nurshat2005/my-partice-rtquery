import LayoutSite from '@/components/layout/LayoutSite';
import { FC, ReactNode } from 'react';

interface Ilayout {
  children: ReactNode;
}
const layout: FC<Ilayout> = ({ children }) => {
  return <LayoutSite>{children}</LayoutSite>;
};

export default layout;
