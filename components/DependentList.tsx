import React, {useState} from 'react'
import DependentForm from './DependentForm'
import {useEmployeesApi} from '../state/employees'
import {Employee, Person} from '../types/types'

interface DependentListProps {
  employee: Employee
}

const DependentList: React.FC<DependentListProps> = ({employee}) => {
  const {addDependent, updateDependent, deleteDependent} = useEmployeesApi()
  const [editingDependent, setEditingDependent] = useState<Person | null>(null)
  const [isAddingDependent, setIsAddingDependent] = useState<boolean>(false)

  // Handler to set the dependent being edited
  const onPressEdit = (dependent: Person) => {
    setEditingDependent(dependent)
  }

  // Handler to update a dependent and reset the editing state
  const handleUpdateDependent = (updatedDependent: Person) => {
    updateDependent(updatedDependent)
    setEditingDependent(null)
  }

  // Handler to add a new dependent and reset the adding state
  const handleAddDependent = (newDependent: Person) => {
    addDependent(employee.id, newDependent)
    setIsAddingDependent(false)
  }

  return (
    <>
      {employee.dependents.map(dependent => (
        <div key={dependent.id} className="border-b border-zinc-100 bg-white">
          <div className="flex justify-between items-center h-[60px] px-5">
            {editingDependent && editingDependent.id === dependent.id ? (
              // Display form for editing dependent
              <DependentForm
                dependent={editingDependent}
                onUpdateDependent={handleUpdateDependent}
                isEditing={true}
              />
            ) : (
              <>
                <span className="font-semibold">{dependent.name}</span>
                <div className="flex gap-2">
                  <button onClick={() => onPressEdit(dependent)}>Edit</button>
                  <button onClick={() => deleteDependent(dependent.id)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
      <div className="flex justify-between items-center h-[60px] px-5 bg-white">
        {isAddingDependent ? (
          // Display form for adding new dependent
          <DependentForm
            onUpdateDependent={handleAddDependent}
            isEditing={false}
          />
        ) : (
          <button
            onClick={() => setIsAddingDependent(true)}
            className="text-slate-700 bg-slate-200 mx-auto rounded-full font-normal px-5">
            Create dependent
          </button>
        )}
      </div>
    </>
  )
}

export default DependentList
