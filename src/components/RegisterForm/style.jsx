import styled from '@emotion/styled'
import ButtonMUI from '@mui/material/Button';
import TextFieldMUI from '@mui/material/TextField';
import AlertMUI from '@mui/material/Alert';
import SnackbarMUI from '@mui/material/Snackbar';


export const Button = styled(ButtonMUI)`
    color: white;
    background-color: blue;
`

export const TextField = styled(TextFieldMUI)`
    color: white;
    background-color: white;
    border-radius: 10px;
    height: 50px;
`

export const H1 = styled.h1`
    color: red;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    min-height: 80px;
    min-width: 600px;
`

export const Alert = styled(AlertMUI)``

export const Snackbar = styled(SnackbarMUI)``