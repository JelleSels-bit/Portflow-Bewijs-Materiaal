import { Navbar,NavbarContent,} from '@heroui/react'
import type {FunctionComponent, } from 'react'
import StyledNavLink from "../../src/navigation/StyledNavLink.tsx"
import navbarTranslationData from "../data/navbarTranslationData.ts"
import {useSettingsContext} from '../context/SettingsContext.tsx'

const Comp: FunctionComponent = () => {
  const {language} = useSettingsContext()
  const l = navbarTranslationData[language]

  return (
    <Navbar>
      <NavbarContent justify="center" className="flex gap-4 w-full">
        <StyledNavLink to="/">{l.home}</StyledNavLink>
        <StyledNavLink to="/MyEvents">{l.events}</StyledNavLink>
        <StyledNavLink to="/Settings">{l.settings}</StyledNavLink>
      </NavbarContent>


    </Navbar>
  )
}
export default Comp;
