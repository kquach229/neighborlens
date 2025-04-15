'use client';
import React from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
const ParalaxParent = ({ children }) => {
  return <ParallaxProvider>{children}</ParallaxProvider>;
};

export default ParalaxParent;
