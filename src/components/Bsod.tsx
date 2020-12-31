import React, { FC } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

interface Props {
  title?: string
  message?: string
}

const Background = styled.div`
  padding-top: 10%;
  background-color: #0001ab;
`
const Scanlines = styled.div`
  &::before {
    background: linear-gradient(
        rgba(18, 16, 16, 0) 50%,
        rgba(0, 0, 0, 0.25) 50%
      ),
      linear-gradient(
        90deg,
        rgba(255, 0, 0, 0.06),
        rgba(0, 255, 0, 0.02),
        rgba(0, 0, 255, 0.06)
      );
    z-index: 1;
    background-size: 100% 3px, 3px 100%;
  }

  &::after {
    background: rgba(18, 16, 16, 0.14);
    opacity: 0;
  }

  &::before,
  &::after {
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    content: ' ';
    pointer-events: none;
  }
`

const Bsod: FC<Props> = ({
  title = 'Windows',
  message = "groovin' too hard",
}) => (
  <Background className="px-24 w-screen h-screen">
    <div className="mb-12 flex justify-center items-center">
      <div className="text-center px-2 py-1 bg-white text-blue-900">
        <h1 className="text-4xl">{title || 'Windows'}</h1>
      </div>
    </div>

    <div className="text-white text-2xl">
      <p>An error has occurred. To continue:</p>
      <br />
      <p>Press the browser back button to return to the page you were at.</p>
      <br />
      <p className="hover:underline">
        <Link href="/">Click here to be redirected to the home screen.</Link>
      </p>
      <br />
      <br />
      <p>Error: &nbsp;&nbsp;{message}</p>
    </div>

    <Scanlines className="absolute inset-0 w-full h-full pointer-events-none" />
  </Background>
)

export default Bsod
