import type {FunctionComponent,PropsWithChildren} from 'react'
import {useEffect, useState} from 'react'
import {useLocation, NavLink} from 'react-router'
import {NavbarItem} from '@heroui/react'

interface StyledNavLinkProps extends  PropsWithChildren{
  to: string
}

const StyledNavLink: FunctionComponent<StyledNavLinkProps> = ({to, children}) => {
  const [Class, setClass] = useState("temp")
  const location = useLocation()

  //useEffect voert pas een stuk code uit nadat react klaar is met renderen terwijl on click het wilt doen voor het gerenderd is
  useEffect(() => {
    if (location.pathname == to)
      setClass("text-lg text-red-400 font-medium")
    else
      setClass("temp")
    }, [location.pathname, to]
  )
  return (
    <NavbarItem className={Class}>
      <NavLink to={to}>{children}</NavLink>
    </NavbarItem>
  )
}


export default StyledNavLink;