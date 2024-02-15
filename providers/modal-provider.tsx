'use client';

import { useEffect, useState } from 'react';

import { RenameModal } from '@/components/modals/rename-modal';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  // set isMounted to true after the component is mounted, i.e. when we get to the client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // do not render when on the server side to avoid hydration mismatches
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <RenameModal />
    </>
  );
};
