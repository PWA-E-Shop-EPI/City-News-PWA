import React from 'react';

import Hero from '../components/Hero';
import Content from '../components/Content';
import dynamic from "next/dynamic";

export default function Index() {
  const MapWithNoSSR = dynamic(() => import("../components/Map"), {
    ssr: false
  });

  return (
    <>
      {/* <Hero />
      <hr /> */}
      <MapWithNoSSR />
    </>
  );
}
