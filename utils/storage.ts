import {Employee} from '../types/types'

export const loadEmployeeData = () => {
  const data = localStorage.getItem('employees')
  return data ? (JSON.parse(data) as Employee[]) : []
}

export const updateEmployeeData = (data: Employee[]) => {
  localStorage.setItem('employees', JSON.stringify(data))
}
