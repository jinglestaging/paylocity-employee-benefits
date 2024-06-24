'use client'
import {useEffect} from 'react'
import EmployeeForm from '../components/EmployeeForm'
import EmployeeList from '../components/EmployeeList'
import {useEmployeesApi, useEmployeesState} from '../state/employees'

export default function HomeScreen() {
  const {initEmployeesState} = useEmployeesApi()
  const {isInitialLoad} = useEmployeesState()

  // init
  useEffect(() => {
    initEmployeesState()
  }, [initEmployeesState])

  // wait for fetch data to resume
  if (isInitialLoad) return null

  return (
    <main className="px-5 py-12">
      <h1 className="font-semibold text-center text-4xl mb-10">
        Healthcare Benefits Calculator
      </h1>
      <div className="max-w-[600px] mx-auto">
        <EmployeeForm />
        <EmployeeList />
      </div>
    </main>
  )
}
