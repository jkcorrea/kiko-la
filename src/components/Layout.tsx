import React, { FC, ReactNode } from 'react'

import Navbar from './Navbar'

interface Props {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => (
  <>
    <Navbar />
    <div className="w-full h-full bg-black">{children}</div>
  </>
)

export default Layout
