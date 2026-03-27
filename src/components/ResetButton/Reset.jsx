import React from 'react'
import { resetCommits } from '../../utils/localStorage'

function Reset() {

  return (
   <button
    onClick={resetCommits}
   >
    Reset
   </button>
  )
}

export default Reset