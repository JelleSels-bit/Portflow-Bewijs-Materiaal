import type { FunctionComponent } from 'react';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { useSettingsContext } from '../context/SettingsContext.tsx';
import settingsPageTranslationData from '../data/settingsPageTranslationData.ts'

const Settings: FunctionComponent = () => {
  const { font, setFont, fontSize, setFontSize, language, setLanguage } = useSettingsContext();
  const l = settingsPageTranslationData[language]
  return (
    <main className="min-h-screen p-6 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8 text-center text-red-500">{l.settings}</h1>

      <div className="flex flex-col gap-6 max-w-2xl mx-auto">
        <div className="bg-black border border-red-700 rounded-lg p-6 shadow-lg">
          <p className={`font-${font} text-${fontSize} mb-3`}>{l.currentFont}: <span className={`font-semibold font-${font} text-${fontSize}`}>{font}</span>
          </p>
          <Dropdown>
            <DropdownTrigger>
              <Button className={`font-${font} text-${fontSize}bg-gray-300 text-black hover:bg-red-500`}>{l.fontMenu}</Button>
            </DropdownTrigger>
            <DropdownMenu className="bg-gray-800 text-white">
              <DropdownItem key="sans" onPress={() => setFont('sans')}>
                Sans
              </DropdownItem>
              <DropdownItem key="serif" onPress={() => setFont('serif')}>
                Serif
              </DropdownItem>
              <DropdownItem key="mono" onPress={() => setFont('mono')}>
                Mono
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        <div className="bg-black border border-red-700 rounded-lg p-6 shadow-lg">
          <p className={`font-${font} text-${fontSize} mb-3`}>
            {l.currentFontSize}: <span className={`font-semibold font-${font} text-${fontSize}`}>{fontSize === "sm" ? l.small : fontSize === "lg" ? l.medium : l.Large}</span>
          </p>
          <Dropdown>
            <DropdownTrigger>
              <Button className={`font-${font} text-${fontSize}bg-gray-300 text-black hover:bg-red-500`}>{l.fontSizeMenu}</Button>
            </DropdownTrigger>
            <DropdownMenu className="bg-gray-800 text-white">
              <DropdownItem key="small" onPress={() => setFontSize('sm')}>
                {l.small}
              </DropdownItem>
              <DropdownItem key="large" onPress={() => setFontSize('lg')}>
                {l.medium}
              </DropdownItem>
              <DropdownItem key="extra large" onPress={() => setFontSize('xl')}>
                {l.Large}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        <div className="bg-black border border-red-700 rounded-lg p-6 shadow-lg">
          <p className={`font-${font} text-${fontSize} mb-3`}>
            {l.currentLanguage}:{' '}
            <span className={`font-semibold font-${font} text-${fontSize}`}>{language.toUpperCase()}</span>
          </p>
          <Dropdown>
            <DropdownTrigger>
              <Button className={`font-${font} text-${fontSize}bg-gray-300 text-black hover:bg-red-500`}>{l.languageMenu}</Button>
            </DropdownTrigger>
            <DropdownMenu className="bg-gray-800 text-white">
              <DropdownItem key="english" onPress={() => setLanguage('en')}>
                {l.english}
              </DropdownItem>
              <DropdownItem key="dutch" onPress={() => setLanguage('nl')}>
                {l.dutch}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </main>
  )
};

export default Settings;
