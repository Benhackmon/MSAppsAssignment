import { Icon, SvgIcon, Typography } from '@mui/material';
import { Row } from '../Layout';

interface PhotoParameterProps {
    SvgIcon: typeof SvgIcon
    text: number | string
}

const PhotoParameter = ({ SvgIcon, text }: PhotoParameterProps) => (
    <Row sx={{ alignItems: 'center', gap: 1 }}>
        <Icon sx={{ color: 'GrayText' }}><SvgIcon /></Icon>
        <Typography variant='body2'>{text}</Typography>
    </Row >
);

export default PhotoParameter;