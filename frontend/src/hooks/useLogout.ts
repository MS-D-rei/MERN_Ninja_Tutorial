import {
  setEmail,
  setIdToken,
  setLoginState,
  setName,
} from '@/store/userSlice';
import { useAppDispatch } from './storeHook';

export function useLogout() {
  const dispatch = useAppDispatch();

  const logout = () => {
    localStorage.removeItem('user');

    dispatch(setName(''));
    dispatch(setEmail(''));
    dispatch(setLoginState(false));
    dispatch(setIdToken(''));
  };

  return {
    logout,
  };
}
