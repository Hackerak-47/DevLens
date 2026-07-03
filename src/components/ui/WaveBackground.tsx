'use client';
import { useEffect, useRef } from 'react';

export default function WaveBackground() {
  return (
    <>
      <div className="wave-container">
        <div className="wave-layer wave-layer--1" />
        <div className="wave-layer wave-layer--2" />
        <div className="wave-layer wave-layer--3" />
      </div>

    </>
  );
}
