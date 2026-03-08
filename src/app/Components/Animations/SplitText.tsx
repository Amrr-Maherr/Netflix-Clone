"use client"
import React, { useRef } from "react";
// TODO: GSAP animation removed for bundle optimization
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { SplitText as GSAPSplitText } from "gsap/SplitText";
// import { useGSAP } from "@gsap/react";

// gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string | ((t: number) => number);
  splitType?: "chars" | "words" | "lines" | "words, chars";
  from?: any;
  to?: any;
  threshold?: number;
  rootMargin?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  textAlign?: React.CSSProperties["textAlign"];
  onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  delay = 100,
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  tag = "p",
  onLetterAnimationComplete,
}) => {
  const ref = useRef<HTMLParagraphElement>(null);

  // TODO: GSAP animation removed for bundle optimization
  // Original GSAP animation code was here

  const renderTag = () => {
    const style: React.CSSProperties = {
      textAlign,
      overflow: "hidden",
      display: "inline-block",
      whiteSpace: "normal",
      wordWrap: "break-word",
    };
    const classes = `split-parent ${className}`;
    switch (tag) {
      case "h1":
        return (
          <h1 ref={ref} style={style} className={classes}>
            {text}
          </h1>
        );
      case "h2":
        return (
          <h2 ref={ref} style={style} className={classes}>
            {text}
          </h2>
        );
      case "h3":
        return (
          <h3 ref={ref} style={style} className={classes}>
            {text}
          </h3>
        );
      case "h4":
        return (
          <h4 ref={ref} style={style} className={classes}>
            {text}
          </h4>
        );
      case "h5":
        return (
          <h5 ref={ref} style={style} className={classes}>
            {text}
          </h5>
        );
      case "h6":
        return (
          <h6 ref={ref} style={style} className={classes}>
            {text}
          </h6>
        );
      default:
        return (
          <p ref={ref} style={style} className={classes}>
            {text}
          </p>
        );
    }
  };
  return renderTag();
};

export default SplitText;
