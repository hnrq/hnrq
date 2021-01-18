import { useEffect } from 'react';
import ReactGA from 'react-ga';

const useAnalyticsPage = (pageName: string) => {
  useEffect(() => {
    ReactGA.pageview(pageName);
  }, [pageName]);
};

export default useAnalyticsPage;