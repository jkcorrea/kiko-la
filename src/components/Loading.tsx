import React, { FC } from 'react'

const Loading: FC = () => (
  <div className="w-screen h-screen flex justify-center items-center text-center text-white">
    <div className="bg-black bg-opacity-75 py-4 px-8">
      <h1 className="text-3xl">Loading...</h1>
    </div>
  </div>
)

export default Loading
