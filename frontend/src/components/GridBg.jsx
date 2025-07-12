import React from 'react';

const GridBg = ({ children }) => {
  return (
    // <div className="relative min-h-screen overflow-hidden bg-[#0f0f23]">
     <div className="relative min-h-screen overflow-hidden bg-[#8a1b92]">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundSize: '50px 50px',
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GridBg;