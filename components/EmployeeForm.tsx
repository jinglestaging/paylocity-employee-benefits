import React, {useState, useEffect, FormEvent} from 'react'
import {Employee} from '../types/types'
import {useEmployeesApi} from '../state/employees'

interface EmployeeFormProps {
  employee?: Employee
  onUpdateEmployee?: (e: Employee) => void
  isEditing?: boolean
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  employee,
  onUpdateEmployee,
  isEditing,
}) => {
  const {addEmployee} = useEmployeesApi()
  const [name, setName] = useState<string>(employee?.name || '')

  // Effect to set the name state when editing an existing employee
  useEffect(() => {
    if (isEditing && employee) {
      setName(employee.name)
    }
  }, [isEditing, employee])

  // Handler for form submission
  const onPressSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isEditing && onUpdateEmployee && employee) {
      // Update existing employee
      onUpdateEmployee({...employee, name})
    } else {
      // Add new employee
      addEmployee({id: Date.now(), name, dependents: []})
    }
    // Reset the name field
    setName('')
  }

  return (
    <form onSubmit={onPressSubmit}>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Employee Name"
        required
      />
      <button type="submit" className="text-white bg-[#ff395c]">
        {isEditing ? 'Update' : 'Create'} Employee
      </button>
    </form>
  )
}

export default EmployeeForm
