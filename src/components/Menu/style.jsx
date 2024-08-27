import styled from '@emotion/styled'
import LinkNEXT from 'next/link'
import TypographyMUI from '@mui/material/Typography';
import DrawerMUI from '@mui/material/Drawer';
import ListItemIconMUI from '@mui/material/ListItemIcon';
import ListItemTextMUI from '@mui/material/ListItemText';

export const Typography = styled(TypographyMUI)`
    margin: 48px 0 30px 30px;
`

export const Span = styled.span`
    font-family: ${({theme}) => theme.typography.h2.fontFamily};
    font-size: 25px;
    font-weight: 500;
    line-height: 32px;
    letter-spacing: 0.08em;
`

export const Drawer = styled(DrawerMUI)``

export const ListItemIcon = styled(ListItemIconMUI)`
    color: #FFFFFFB2;
    padding: 0 0 0 15px;
`

export const ListItemText = styled(ListItemTextMUI)`
    color: #FFFFFFB2;
`

export const Link = styled(LinkNEXT)`
    text-decoration: none;
`
