import * as React from "react";
import { SVGProps } from "react";
const GermanyFlagSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 24 24"
    {...props}
  >
    <g>
      <path
        d="m0 345 256.7-25.5L512 345v167H0z"
        style={{
          stroke: "none",
          strokeWidth: 1,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeDashoffset: 0,
          strokeLinejoin: "miter",
          strokeMiterlimit: 4,
          fill: "#ffda44",
          fillRule: "nonzero",
          opacity: 1,
        }}
        transform="scale(.04688)"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="m0 167 255-23 257 23v178H0z"
        style={{
          stroke: "none",
          strokeWidth: 1,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeDashoffset: 0,
          strokeLinejoin: "miter",
          strokeMiterlimit: 4,
          fill: "#d80027",
          fillRule: "nonzero",
          opacity: 1,
        }}
        transform="scale(.04688)"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M0 0h512v167H0z"
        style={{
          stroke: "none",
          strokeWidth: 1,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeDashoffset: 0,
          strokeLinejoin: "miter",
          strokeMiterlimit: 4,
          fill: "#333",
          fillRule: "nonzero",
          opacity: 1,
        }}
        transform="scale(.04688)"
        vectorEffect="non-scaling-stroke"
      />
    </g>
  </svg>
);
export default GermanyFlagSvg;
