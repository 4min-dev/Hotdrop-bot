import React from 'react'

const Done:React.FC = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="31" height="25" viewBox="0 0 31 25" fill="none">
            <g filter="url(#filter0_d_175_621)">
                <path d="M6.5 12.3158L12.5004 18L24.5 6.63159" stroke="#8A2EE8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            </g>
            <defs>
                <filter id="filter0_d_175_621" x="0.3" y="0.431592" width="30.4" height="23.7684" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="2.35" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.541176 0 0 0 0 0.180392 0 0 0 0 0.909804 0 0 0 0.35 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_175_621" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_175_621" result="shape" />
                </filter>
            </defs>
        </svg>
    )
}

export default Done
