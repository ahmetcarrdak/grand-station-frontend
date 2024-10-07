import React, { createContext, useContext, useState, ReactNode } from 'react';

// MenuContext için interface tanımı
interface MenuContextType {
  isAccessLogVisible: boolean;
  setIsAccessLogVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

// MenuContext oluşturma
const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [isAccessLogVisible, setIsAccessLogVisible] = useState<boolean>(false);

  return (
    <MenuContext.Provider value={{ isAccessLogVisible, setIsAccessLogVisible }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenuContext = (): MenuContextType => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error("useMenuContext must be used within a MenuProvider");
  }
  return context;
};
