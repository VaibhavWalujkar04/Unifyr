import React from 'react'
import GetStartedCandidateForm from '../Components/GetStartedCandidateForm'
import Navbar from '../Components/Navbar'
const GetStartedCandidate = () => {
  return (
    <div className='bg-gradient-to-b from-gray-50 to-gray-100 '>
        <Navbar/>
        <GetStartedCandidateForm/>
    </div>
)
}

export default GetStartedCandidate