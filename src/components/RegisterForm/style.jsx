import styled from '@emotion/styled'
import ButtonMUI from '@mui/material/Button';
import TextFieldMUI from '@mui/material/TextField';
import AlertMUI from '@mui/material/Alert';
import SnackbarMUI from '@mui/material/Snackbar';
import TypographyMUI from '@mui/material/Typography';
import LinkNEXT from 'next/link';
import IconButtonMUI from '@mui/material/IconButton';
import OutlinedInputMUI from '@mui/material/OutlinedInput';
import InputLabelMUI from '@mui/material/InputLabel';
import InputAdornmentMUI from '@mui/material/InputAdornment';
import FormControlMUI from '@mui/material/FormControl';
import VisibilityMUI from '@mui/icons-material/Visibility';
import VisibilityOffMUI from '@mui/icons-material/VisibilityOff';


export const Button = styled(ButtonMUI)`
    margin-bottom: 40px;
`

export const TextField = styled(TextFieldMUI)`
    color: white;
    background-color: ${({ theme }) => theme.palette.background.default};
    border-radius: 15px;
    height: 50px;
    margin-bottom: 34px;
`

export const Span = styled.span`
    font-family: ${({theme}) => theme.typography.h2};
    font-size: 40px;
    font-weight: 500;
    line-height: 32px;
    letter-spacing: 0.08em;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    min-width: 400px;
`

export const Alert = styled(AlertMUI)``

export const Snackbar = styled(SnackbarMUI)``

export const Typography = styled(TypographyMUI)`
    padding-bottom: 24px;
`
export const P = styled.p`
    font-family: ${( Inter ) => Inter};
    font-weight: 400;
    font-size: 14px;
    color: #999DA3;
    padding: 18px;
`

export const Link = styled(LinkNEXT)`
    color: ${({ theme }) => theme.palette.primary.main};
    text-decoration: none;
    font-weight: 600;
`
export const IconButton = styled(IconButtonMUI)``

export const OutlinedInput= styled(OutlinedInputMUI)``

export const InputLabel = styled(InputLabelMUI)``

export const InputAdornment = styled(InputAdornmentMUI)``

export const FormControl  = styled(FormControlMUI )`
    margin-bottom: 34px;
`

export const Visibility = styled(VisibilityMUI)``

export const VisibilityOff = styled(VisibilityOffMUI)``