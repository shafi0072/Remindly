'use client';
import React, { createContext, useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { fetchAuthSession, signOut } from '@aws-amplify/auth';
import { usePathname, useRouter } from 'next/navigation';
import { Typography } from '@mui/material';
import { getCurrentUser } from 'aws-amplify/auth';
// import Loading from '@/app/loading';

export const UserContext = createContext({});

const AuthContext = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState({});
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackPosition, setSnackPosition] = useState({
    vertical: 'top',
    horizontal: 'right',
  });
  const [triggerdSignout, setTriggerdSignout] = useState(false);
  const [snackVariant, setSnackVariant] = useState('success');
  const { vertical, horizontal } = snackPosition;
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loaderScreen, setLoaderScreen] = useState(true);
  const [messageForAuthorization, setMessagForAuthorization] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const isPublicRoute = (pathname) => {
    return (
      pathname.startsWith('/auth/') ||
      pathname.startsWith('/sign-up') ||
      pathname.startsWith('/verify')
    );
  };

  const handleClose = (event) => {
    setSnackOpen(false);
    setSnackMessage('');
  };

  

  useEffect(() => {
    const initializeAuth = async () => {
        try {
          setMessagForAuthorization('Checking user information');
      
          const session = await fetchAuthSession();
          const hasAuth = session?.tokens?.idToken;
      
          if (hasAuth) {
            const currentUser = await getCurrentUser();
            setUser(session.tokens.idToken.payload);
            setIsLoggedIn(true);
          } else {
            throw new Error("No authenticated session found.");
          }
        } catch (err) {
          console.error('Auth error:', err);
          setMessagForAuthorization('🚫 Failed to check user information!');
          setIsLoggedIn(false);
      
          // Make sure pathname is defined and check access
          const currentPath = pathname || window.location.pathname;
      
          if (!isPublicRoute(currentPath)) {
            router.push('/auth/signin');
          }
        } finally {
          setLoading(false);
          setIsLoading(false);
          setLoaderScreen(false);
        }
      };
      
      

    initializeAuth();
  }, [router, isLoggedIn, setIsLoading, pathname]);

 

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        snackOpen,
        setSnackOpen,
        snackMessage,
        setSnackMessage,
        snackVariant,
        setSnackVariant,
        setLoading,
        loading,
        isLoggedIn,
        setIsLoggedIn,
        loaderScreen,
        setLoaderScreen,
        messageForAuthorization,
        setMessagForAuthorization,
        triggerdSignout,
        setTriggerdSignout,
        isLoading,
      }}
    >
      {!triggerdSignout ? (
        <Box>{children}</Box>
      ) : (
        <Box>
          <Typography>Loading</Typography>
        </Box>
      )}

      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        key={vertical + horizontal}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert
          onClose={handleClose}
          severity={snackVariant}
          variant="filled"
          sx={{ color: 'white' }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>
    </UserContext.Provider>
  );
};

export default AuthContext;