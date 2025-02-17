import { useState } from 'react'
import Form from './components/Form'
import { IFormData } from './utils/interfaces'

function App() {
  const [data, setData] = useState<IFormData>({
    firstName: '',
    lastName: '',
    age: 0,
    gender: '',
    skills: '',
    email: '',
    phoneNumber: '',
    address: ''
  })

  const [showData, setShowData] = useState(false)
  return (
    <main className='flex flex-col items-center justify-center h-screen text-white'>
      {
        showData ?
          <div className="w-full items-center p-4 bg-[#282828] flex gap-2 flex-col max-w-[512px] h-[480px]  py-8 rounded-lg overflow-y-auto">
            <h1 className="text-2xl font-bold text-left w-full">Submitted User Data</h1>
            <div className="flex flex-col gap-2 mt-8 w-full text-lg text-slate-200">
              <p><span className="font-bold">First Name:</span> {data.firstName}</p>
              <p><span className="font-bold">Last Name:</span> {data.lastName}</p>
              <p><span className="font-bold">Age:</span> {data.age}</p>
              <p><span className="font-bold">Gender:</span> {data.gender}</p>
              <p><span className="font-bold">Skills:</span> {data.skills}</p>
              <p><span className="font-bold">Email:</span> {data.email}</p>
              <p><span className="font-bold">Phone Number:</span> {data.phoneNumber}</p>
              <p><span className="font-bold">Address:</span> {data.address}</p>
            </div>
            <button onClick={() => setShowData(false)} className="p-2 mt-4 bg-blue-600 hover:bg-blue-500 cursor-pointer rounded-lg focus:outline-0 w-full">Edit</button>
          </div>
          :
          <Form data={data} setData={setData} setShowData={setShowData} />
      }
    </main>
  )
}

export default App

