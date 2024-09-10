'use client'

import * as S from './style'
import * as React from 'react';
import { useRouter } from 'next/navigation'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
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
                <S.ListItem>
                    <S.Link href="/dashboard">
                        <S.ListItemButton>
                            <S.ListItemIcon>
                                <GridViewIcon />
                            </S.ListItemIcon>
                            <S.ListItemText primary="Meu painel" />
                        </S.ListItemButton>
                    </S.Link>
                </S.ListItem>
                <S.ListItem>
                    <S.Link href="/category">
                        <S.ListItemButton>
                            <S.ListItemIcon>
                                <AccountBalanceWalletIcon />
                            </S.ListItemIcon>
                            <S.ListItemText primary="Categoria" />
                        </S.ListItemButton>
                    </S.Link>
                </S.ListItem>
                <S.ListItem>
                    <S.Link href="/extract">
                        <S.ListItemButton>
                            <S.ListItemIcon>
                                <SyncAltIcon />
                            </S.ListItemIcon>
                            <S.ListItemText primary="Extrato" />
                        </S.ListItemButton>
                    </S.Link>
                </S.ListItem>
            </List>
            <List>
                <S.ListItem>
                    <S.ListItemButton onClick={doLogout}>
                        <S.ListItemIcon>
                            <ExitToAppIcon />
                        </S.ListItemIcon>
                        <S.ListItemText primary="Sair" />
                    </S.ListItemButton>
                </S.ListItem>
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