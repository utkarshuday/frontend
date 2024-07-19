import { useRef, useEffect } from 'react';
function useOutsideClick(setIsOpen) {
  const ref = useRef(null);

  useEffect(() => {
    const handleOutsideClick = event => {
      if (ref.current && !ref.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener('click', handleOutsideClick, true);
    return () => {
      document.removeEventListener('click', handleOutsideClick, true);
    };
  }, [setIsOpen]);

  return ref;
}

export default useOutsideClick;
