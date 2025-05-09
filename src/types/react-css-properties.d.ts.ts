import 'react';

declare module 'react' {
  interface CSSProperties {
    '--gradient-border'?: React.CSSProperties['border'],
    '--background__swiper__card'?: React.CSSProperties['background'],
    '--background-color'?: React.CSSProperties['background'],
    '--box-shadow'?: React.CSSProperties['boxShadow'],
    '--svg-fill'?:React.CSSProperties['fill']
  }
}