import React, {useState} from 'react'
import DependentList from './DependentList'
import EmployeeForm from './EmployeeForm'
import {calculateBenefits, calculateNetPaycheck} from '../utils/benefits'
import {Employee} from '../types/types'
import {useEmployeesApi, useEmployeesState} from '../state/employees'

const EmployeeList: React.FC = () => {
  const {updateEmployee, deleteEmployee} = useEmployeesApi()
  const {employees} = useEmployeesState()
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)

  // Handler to set the employee being edited
  const handleEditClick = (employee: Employee) => {
    setEditingEmployee(employee)
  }

  // Handler to update an employee and reset the editing state
  const handleUpdateEmployee = (updatedEmployee: Employee) => {
    updateEmployee(updatedEmployee)
    setEditingEmployee(null)
  }

  return (
    <div className="flex flex-col gap-20 mt-10">
      {employees?.map(employee => (
        <div
          key={employee.id}
          className="rounded-lg overflow-hidden shadow-2xl">
          {/* Employee Header */}
          <div className="flex justify-between items-center border-b border-zinc-200 pb-5 h-[75px] bg-[#deebf8] p-5">
            {editingEmployee && editingEmployee.id === employee.id ? (
              <EmployeeForm
                employee={editingEmployee}
                onUpdateEmployee={handleUpdateEmployee}
                isEditing={true}
              />
            ) : (
              <>
                <span className="font-semibold">{employee.name}</span>
                <div className="flex gap-2">
                  <button onClick={() => handleEditClick(employee)}>
                    Edit
                  </button>
                  <button onClick={() => deleteEmployee(employee.id)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>

          {/* List of Dependents */}
          <DependentList employee={employee} />

          {/* Benefits and Net Paycheck Information */}
          <div className="border-t border-zinc-100 flex justify-between flex-col md:flex-row p-5 bg-white">
            <div>
              Cost per paycheck:{' '}
              <span className="font-semibold">
                ${calculateBenefits(employee).toFixed(2)}
              </span>
            </div>
            <div>
              Net paycheck:{' '}
              <span className="font-semibold">
                ${calculateNetPaycheck(employee).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default EmployeeList
