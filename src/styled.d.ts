import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        borderRadius: string; 
        fontFamily: string;
        colors: {
            main: string;
            secondary: string;
        }
    }
}