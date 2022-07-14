import Head from 'next/head';

import { Box } from '@mui/material';
import { Navbar, Sidebar } from '../ui';
import { useState } from 'react';

interface Props {
  title: string;
  children: JSX.Element;
}

const Layout = ({ title, children }: Props) => {

  const [handleMenu, setHandleMenu] = useState(false);

  return (
    <Box>
      <Head>
        <title>{ title || 'Jira App'}</title>
      </Head>

      <Navbar />
      <Sidebar />

      <Box sx={{ padding: '10px 20px' }}    >
        { children }
      </Box>
    </Box>
  )
}
export default Layout