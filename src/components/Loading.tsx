import React, { FC } from 'react'
import { LoadingIndicator, Window } from 'react95'

const Loading: FC = () => (
  <div className="w-screen h-screen flex justify-center items-center">
    <Window>
      <div className="px-6 py-1 space-y-3">
        <p className="text-center">Loading...</p>
        <LoadingIndicator isLoading />
      </div>
    </Window>
  </div>
)

export default Loading
