import { createContext, useContext, useState,  } from 'react';
import type {ReactNode} from "react"
type FontType = 'sans' | 'serif' | 'mono';
type FontSizeType = 'sm' | 'lg' | 'xl'
type LanguageType = 'en' | 'nl'

interface AppContextType {
  fontSize: FontSizeType;
  setFontSize: (fontSize: FontSizeType) => void;
  font: FontType;
  setFont: (font: FontType) => void;
  language: LanguageType;
  setLanguage: (language: LanguageType) => void;
}

const SettingsContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [font, setFont] = useState<FontType>('sans');
    const [fontSize, setFontSize] = useState<FontSizeType>('xl');
    const [language, setLanguage] = useState<LanguageType>('en');
  return (
    <SettingsContext.Provider value={{ font, setFont,fontSize, setFontSize, language, setLanguage }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettingsContext must be used within AppProvider');
  return context;
};
