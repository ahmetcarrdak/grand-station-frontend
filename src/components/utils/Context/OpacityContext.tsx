import React, { createContext, useContext, useState, ReactNode } from 'react';

// OpacityContext için interface tanımı
interface OpacityContextType {
  opacity_dark: boolean;
  setOpacityDark: React.Dispatch<React.SetStateAction<boolean>>;
}

// OpacityContext oluşturma
const OpacityContext = createContext<OpacityContextType | undefined>(undefined);

export const OpacityProvider = ({ children }: { children: ReactNode }) => {
  const [opacity_dark, setOpacityDark] = useState<boolean>(false);

  return (
    <OpacityContext.Provider value={{ opacity_dark, setOpacityDark }}>
      {children}
    </OpacityContext.Provider>
  );
};

export const useOpacityContext = (): OpacityContextType => {
  const context = useContext(OpacityContext);
  if (context === undefined) {
    throw new Error("useOpacityContext must be used within an OpacityProvider");
  }
  return context;
};
