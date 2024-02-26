import { useEffect } from 'react';

/* 
  - this hook is used to disable the scroll effect that occurs due to other collaborators working on the same board having bigger screen size and to avoid the scroll effect for the current user's screen
*/
export const useDisableScrollBounce = () => {
  useEffect(() => {
    document.body.classList.add('overflow-hidden', 'overscroll-none');
    return () => {
      document.body.classList.remove('overflow-hidden', 'overscroll-none');
    };
  }, []);
};
