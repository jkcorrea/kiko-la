import React from 'react'
import { Window, WindowContent, WindowHeader } from 'react95'

const WelcomeSign = () => (
  <Window
    className="absolute block bg-white left-0 top-0 w-64 text-black"
    style={{ transform: 'translate3d(0px, 0px, -100px)' }}
  >
    <WindowHeader active={false}>
      <span>kiko-la.exe</span>
    </WindowHeader>
    <WindowContent className="w-full h-full p-64 flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-2xl">Welcome to</h1>
        <h2 className="text-4xl">Kiko L.A. !</h2>
      </div>
    </WindowContent>
  </Window>
)

export default WelcomeSign
