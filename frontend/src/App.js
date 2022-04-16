// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import { AuthContext } from './hooks/useAuth';
import useFindUser from './hooks/useFindUser';

// ----------------------------------------------------------------------

export default function App() {
  /* eslint-disable */
  const { currentUser, setCurrentUser, isLoading, setLoading } = useFindUser();

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, isLoading, setLoading }}>
      <ThemeConfig>
        <ScrollToTop />
        <GlobalStyles />
        <BaseOptionChartStyle />
        <Router />
      </ThemeConfig>
    </AuthContext.Provider>
  );
}
