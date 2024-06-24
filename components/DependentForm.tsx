import React, {useState, useEffect, FormEvent} from 'react'
import {Person} from '../types/types'

interface DependentFormProps {
  dependent?: Person
  onUpdateDependent: (d: Person) => void
  isEditing: boolean
}

const DependentForm: React.FC<DependentFormProps> = ({
  dependent,
  onUpdateDependent,
  isEditing,
}) => {
  const [name, setName] = useState<string>(dependent?.name || '')

  // Effect to set the name state when editing an existing dependent
  useEffect(() => {
    if (isEditing && dependent) {
      setName(dependent.name)
    }
  }, [isEditing, dependent])

  // Handler for form submission
  const onPressSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isEditing && dependent) {
      // Update existing dependent
      onUpdateDependent({...dependent, name})
    } else {
      // Add new dependent
      onUpdateDependent({id: Date.now(), name})
    }
    // Reset the name field
    setName('')
  }

  return (
    <form onSubmit={onPressSubmit}>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Dependent Name"
        required
      />
      <button type="submit" className="border border-[#ff395c]">
        {isEditing ? 'Update' : 'Add'} Dependent
      </button>
    </form>
  )
}

export default DependentForm
