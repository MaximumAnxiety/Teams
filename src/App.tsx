import { useState } from 'react'

import './App.css'
import Standings from './components/molekules/standings'
import Table from './components/molekules/Table'
function App() {
 

  return (
    <div className='container'>
      <Standings></Standings>
      <Table></Table>
    </div>
  )
}

export default App
