import { useEffect, useState } from 'react';

const useMediaQueries = (handleResize: () => void): void => {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!done) {
      handleResize();
      window.addEventListener('resize', handleResize);
      setDone(true);
    }
    return () => {
      if (done) window.removeEventListener('resize', handleResize);
    };
  }, [handleResize, done]);
};

export default useMediaQueries;
