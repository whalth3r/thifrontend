import { useEffect, useState } from 'react';

export function useMediaQuery(query: string) {
  const [isFullfilled, setIsFullfilled] = useState(false);

  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setIsFullfilled(event.matches);
    }

    const result = matchMedia(query);
    result.addEventListener('change', onChange);
    setIsFullfilled(result.matches);

    return () => result.removeEventListener('change', onChange);
  }, [query]);

  return isFullfilled;
}
