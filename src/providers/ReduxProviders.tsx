"use client";
import { store } from '@/redux/store';
import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
interface IReduxProviders {
  children: ReactNode;
}
const ReduxProviders: FC<IReduxProviders> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProviders;
