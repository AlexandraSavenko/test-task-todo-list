import React, { Suspense } from 'react'
import Header from '../Header/Header'

interface LayoutProps {
    children: React.ReactNode
}
const Layout: React.FC<LayoutProps> = ({children}) => {
  return (
    <>
      <Header/>
    <Suspense fallback={null}>{children}</Suspense>
    </>
  )
}

export default Layout
