import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';

import { Button, LogoContainer, ButtonText } from './styles';

interface SocialSignInButtonProps extends RectButtonProps {
    title: string;
    svg: React.FC<SvgProps>;
}

export function SocialSignInButton({
    title,
    svg: Svg,
    ...rest
}: SocialSignInButtonProps) {
    return (
        <Button {...rest}>
            <LogoContainer>
                <Svg />
            </LogoContainer>

            <ButtonText>{title}</ButtonText>
        </Button>
    );
}