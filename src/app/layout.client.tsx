import ReduxProviders from '@/providers/ReduxProviders';
import { FC, ReactNode } from 'react';

interface IlayoutClient {
  children: ReactNode;
}
const LayoutClient: FC<IlayoutClient> = ({ children }) => {
  return <ReduxProviders>{children}</ReduxProviders>;
};

export default LayoutClient;
