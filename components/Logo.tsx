import * as React from "react"

type Props = {
    className?: string,
}

const Logo: React.FC<Props> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 130 60"
    {...props}
  >
    <path d="M31.144 39.809V27.362L56.152 0v43.245h-9.62V22.829l-15.388 16.98ZM60.64 43.246h9.363l.072-14.122h4.9L102.696 60V47.03L85.508 28.172a9.982 9.982 0 0 0 6.01-8.032l.105-.921a17.78 17.78 0 0 0 .094-3.03c-.369-6.825-5.84-12.265-12.665-12.59l-1.809-.086H60.64v39.732Zm15.88-22.012-.776.042h-5.705V10.794h5.485l1.268.152a5.834 5.834 0 0 1 3.28 1.52 5.841 5.841 0 0 1 1.76 3.158 5.618 5.618 0 0 1-5.313 5.61h.001ZM12.507 16.71H0l16.434 18.126v21.152l2.04-2.244V23.306l-2.04-2.256-3.927-4.34Z" />
    <path d="m25.705 3.514 4.943 5.507-5.146 5.614v.029l-.912 1.011V47.02l2.04-2.245v-.038l.006-.006V25.584L46.72 3.514H25.705ZM22.12 18.356l-1.133 1.262v.02l-.47.518V51.5l2.037-2.242V17.912l-.435.48v-.036ZM119.376 28.863l-.702 1.046c-3.596 5.36-11.101 6.29-15.898 1.976l-.516-.464a10.799 10.799 0 0 1-3.589-8.173 10.803 10.803 0 0 1 3.589-8.176l.516-.464c4.798-4.315 12.302-3.385 15.898 1.976l.702 1.045h10.367l-.621-1.195-1.104-2.126a20.099 20.099 0 0 0-3.921-5.252c-3.802-3.65-8.83-5.543-13.885-5.543-5.568 0-11.176 2.292-15.228 7.058a18.444 18.444 0 0 0-4.385 12.676 18.444 18.444 0 0 0 4.385 12.674c4.051 4.766 9.659 7.058 15.228 7.058 5.055 0 10.083-1.893 13.885-5.543a20.026 20.026 0 0 0 3.921-5.252l1.104-2.126.621-1.196h-10.367v.001Z" />
    <path d="m114.352 23.247 15.39 17.258V23.247h-15.39Z" />
  </svg>
);

const FullLogo: React.FC<Props> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512.97 236.82"
    {...props}
  >
    <defs>
      <linearGradient id="a" x1="50%" x2="50%" y1="0%" y2="100%">
        <stop offset="0%" stopColor="#ccc" />
        <stop offset="35%" stopColor="#fff" />
      </linearGradient>
      <filter id="b">
        <feFlood floodColor="#fff" />
        <feComposite in2="SourceAlpha" operator="out" />
        <feMorphology operator="dilate" radius={6} />
        <feGaussianBlur result="blur" stdDeviation={4} />
        <feComposite in2="SourceGraphic" operator="atop" result="inner" />
        {/* <feTurbulence baseFrequency={10} result="fNoise" type="fractalNoise" />
        <feColorMatrix type="saturate" values={"0"} />
        <feComposite
          in="inner"
          in2="clipNoise"
          k1={0.5}
          k2={1}
          operator="arithmetic"
        /> */}
      </filter>
    </defs>
    <g fill="url(#a)" filter="url(#b)">
      <path d="m101.63 13.87 19.55 21.73-23.96 26.27v123.71l8.07-8.86v-.15l.02-.02v-75.57l79.41-87.11h-83.09zM81.11 79.56v123.71l8.06-8.85V70.7l-8.06 8.86zM64.97 83.08 49.45 65.96H0l64.97 71.54v83.48l8.07-8.86V91.99l-8.07-8.91z" />
      <path d="M123.13 157.12V108L222.01 0v170.68h-38.04V90.1l-60.84 67.01ZM239.76 170.69h37.02l.29-55.74h19.37l109.6 121.87v-51.19l-67.96-74.43c13.05-5.54 24.55-16.09 24.55-47.3 0-26.98-23.09-48.41-50.07-49.69l-7.15-.34h-65.64v156.82Zm62.78-86.88-3.07.16h-22.55V42.6h21.69l5.01.6c4.97.59 9.47 2.76 12.97 6 3.5 3.23 5.99 7.56 6.96 12.46 0 11.78-9.23 21.51-21.01 22.14Z" />
      <path d="m471.95 113.96-2.75 4.09c-14.22 21.16-43.89 24.82-62.86 7.8 0 0-16.23-10.91-16.23-34.09-.12-11.82 1.82-19.71 16.23-34.1s48.64-13.36 62.86 7.8l2.77 4.13h40.98l-6.82-13.11c-4.18-8.02-9.45-14.94-15.5-20.73-15.03-14.41-34.91-21.88-54.9-21.88-22.02 0-44.19 9.05-60.21 27.86-12.23 14.36-18.01 32.28-17.33 50.03-.68 17.75 5.12 35.68 17.33 50.02 16.02 18.81 38.19 27.86 60.21 27.86 19.99 0 43.95-6.7 60.77-28.18l16.45 18.41V91.75H452.1l19.84 22.21Z" />
    </g>
  </svg>
);

export default Logo;
export { Logo, FullLogo };