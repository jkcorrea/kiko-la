import React, { FC, useState } from 'react'
import { AppBar, Button, List, ListItem, TextField, Toolbar } from 'react95'
import styled from 'styled-components'

const StyledList = styled(List)`
  position: absolute;
  left: 0;
  top: 100%;

  & li:hover {
    cursor: pointer;
  }
`

const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <AppBar className="z-50">
      <Toolbar className="justify-between">
        <div className="relative inline-block">
          <Button
            className="font-bold"
            active={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            <img
              src="/android-chrome-192x192.png"
              alt="kiko-la logo"
              className="h-5 mr-1"
            />
            Start
          </Button>
          {isOpen && (
            <StyledList onClick={() => setIsOpen(false)}>
              <ListItem>
                <span role="img" aria-label="🏝">
                  🏝
                </span>
                About Us
              </ListItem>
            </StyledList>
          )}
        </div>

        <TextField placeholder="Search..." width={150} />
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
