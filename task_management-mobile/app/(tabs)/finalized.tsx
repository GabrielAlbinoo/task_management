import Tasklist from '@/components/taskList'
import React, { Component } from 'react'

export class Finalized extends Component {
  render() {
    return <Tasklist taskStatus={'finalizado'} />
  }
}

export default Finalized