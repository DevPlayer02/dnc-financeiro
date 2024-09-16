import styled from '@emotion/styled'
import TextFieldMUI from '@mui/material/TextField';
import AlertMUI from '@mui/material/Alert';
import SnackbarMUI from '@mui/material/Snackbar';
import DialogTitleMUI from '@mui/material/DialogTitle';


export const DialogTitle = styled(DialogTitleMUI)`
    text-align: center;
    margin-bottom: 12px;
`

export const TextField = styled(TextFieldMUI)`
    color: white;
    background-color: ${({ theme }) => theme.palette.background.default};
    border-radius: 10px;
    height: 50px;
    margin: 15px 0;
`

export const H1 = styled.h1`
    color: red;
`

export const Form = styled.form``

export const Alert = styled(AlertMUI)``

export const Snackbar = styled(SnackbarMUI)``

