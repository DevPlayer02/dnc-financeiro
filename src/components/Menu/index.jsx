'use client'

import * as S from './style'
import * as React from 'react';
import { useRouter } from 'next/navigation'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import GridViewIcon from '@mui/icons-material/GridView'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const drawerWidth = 300;
    
export const Menu = ({ children }) => {
    const router = useRouter()

    const doLogout = () => {
        localStorage.removeItem('token')
        router.push('/login')
    }

    return (
        <Box sx={{ display: 'flex' }}>
        <S.Drawer
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            },
            '& .MuiPaper-root': {
                backgroundColor: '#000000',
                color: '#FFFFFF'
            }
            }}
            variant="permanent"
            anchor="left"
        >
            <List>
                <S.Typography variant="h2" color="primary">YOUR<S.Span>finance.</S.Span>IO</S.Typography>
                <ListItem disablePadding>
                    <S.Link href="/dashboard">
                        <ListItemButton>
                            <S.ListItemIcon>
                                <GridViewIcon />
                            </S.ListItemIcon>
                            <S.ListItemText primary="Meu painel" />
                        </ListItemButton>
                    </S.Link>
                </ListItem>
                <ListItem disablePadding>
                    <S.Link href="/category">
                        <ListItemButton>
                            <S.ListItemIcon>
                                <AccountBalanceWalletIcon />
                            </S.ListItemIcon>
                            <S.ListItemText primary="Categoria" />
                        </ListItemButton>
                    </S.Link>
                </ListItem>
                <ListItem disablePadding>
                    <S.Link href="/extract">
                        <ListItemButton>
                            <S.ListItemIcon>
                                <SyncAltIcon />
                            </S.ListItemIcon>
                            <S.ListItemText primary="Extrato" />
                        </ListItemButton>
                    </S.Link>
                </ListItem>
            </List>
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={doLogout}>
                        <S.ListItemIcon>
                            <ExitToAppIcon />
                        </S.ListItemIcon>
                        <S.ListItemText primary="Sair" />
                    </ListItemButton>
                </ListItem>
            </List>
        </S.Drawer>
        <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
            {children}
        </Box>
        </Box>
  );
};

export default Menu;