import { useContext } from 'react';
import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';

import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';

import { UIContext } from '../../context/ui';

const menuItems: string[] = ['Inbox', 'Starred', 'Send Email', 'Drafts'];

const Sidebar = () => {

  const { sidemenuOpen ,closeSideMenu } = useContext(UIContext)
  return (
    <Drawer
      anchor='left'
      open={ sidemenuOpen }
      onClose={ closeSideMenu }
    >
      <Box sx={{ width: 250 }}>

        <Box sx={{ padding: '5px 10px' }}>
          <Typography variant='h4'>Menu</Typography>
        </Box>
        <List>
          {
            menuItems.map( (text, i) => (
              <ListItem button key={ text }>
                <ListItemIcon>
                  { i % 2 
                    ? <InboxOutlinedIcon /> 
                    : <MailOutlineOutlinedIcon />  
                  }
                </ListItemIcon>
                <ListItemText>{ text }</ListItemText>
              </ListItem>
            ))
          }
        </List>
        <Divider />
        <List>
          {
            menuItems.map( (text, i) => (
              <ListItem button key={ text }>
                <ListItemIcon>
                  { i % 2 
                    ? <InboxOutlinedIcon /> 
                    : <MailOutlineOutlinedIcon />  
                  }
                </ListItemIcon>
                <ListItemText>{ text }</ListItemText>
              </ListItem>
            ))
          }
        </List>

      </Box>
    </Drawer>
  )
}
export default Sidebar