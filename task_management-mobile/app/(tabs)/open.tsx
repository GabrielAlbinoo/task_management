import Tasklist from '@/components/TaskList'
import { TaskStatus } from '@/services/task'
import React from 'react'

export default function Open () {
  return <Tasklist taskStatus={TaskStatus.OPEN} />

}
