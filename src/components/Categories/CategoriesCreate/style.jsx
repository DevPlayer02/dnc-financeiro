import styled from '@emotion/styled'
import ButtonMUI from '@mui/material/Button';
import TextFieldMUI from '@mui/material/TextField';
import AlertMUI from '@mui/material/Alert';
import SnackbarMUI from '@mui/material/Snackbar';
import DialogTitleMUI from '@mui/material/DialogTitle';


export const DialogTitle = styled(DialogTitleMUI)`
    text-align: center;
    margin-bottom: 12px;
`

export const Button = styled(ButtonMUI)`
    color: white;
    background-color: blue;
    margin-left: 44%;
    margin-top: 32px;
`

export const TextField = styled(TextFieldMUI)`
    color: white;
    background-color: ${({ theme }) => theme.palette.background.default};
    border-radius: 10px;
    height: 50px;
`

export const H1 = styled.h1`
    color: red;
`

export const Alert = styled(AlertMUI)``

export const Snackbar = styled(SnackbarMUI)``