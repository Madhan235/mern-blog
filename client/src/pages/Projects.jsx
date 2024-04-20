import React from 'react'
import Chart from '../components/Chart'

const Projects = () => {
  return (
    <div className='min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3'> <h1 className='text-3xl font-semibold'>
      Projects
      </h1>
      <p className='text-md text-gray-500 '>
         I integrated chart.js library into this project, this project demonstrate the pie,bar and line chart , as i tried to work with chart.js for the first time , and its the better way to create charts in the web application !!
      </p>
      <div className="">
        <Chart/>
      </div>
      </div>
  )
}

export default Projects