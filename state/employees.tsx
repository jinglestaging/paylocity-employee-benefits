'use client'
import React, {
  useState,
  useCallback,
  useMemo,
  createContext,
  useContext,
} from 'react'
import {Employee, Person} from '../types/types'
import {initialEmployees} from '../mockData'
import {loadEmployeeData, updateEmployeeData} from '../utils/storage'

// Define the shape of the state context
export type StateContextType = {
  isInitialLoad: boolean
  employees: Employee[] | undefined
}

// Define the shape of the API context
export type ApiContextType = {
  initEmployeesState: () => void
  addEmployee: (employee: Employee) => void
  updateEmployee: (updatedEmployee: Employee) => void
  deleteEmployee: (employeeId: number) => void
  addDependent: (employeeId: number, dependent: Person) => void
  updateDependent: (updatedDependent: Person) => void
  deleteDependent: (dependentId: number) => void
}

// Create the state context with default values
const StateContext = createContext<StateContextType>({
  isInitialLoad: true,
  employees: undefined,
})

// Create the API context with default empty functions
const ApiContext = createContext<ApiContextType>({
  initEmployeesState: () => {},
  addEmployee: () => {},
  updateEmployee: () => {},
  deleteEmployee: () => {},
  addDependent: () => {},
  updateDependent: () => {},
  deleteDependent: () => {},
})

export function Provider({children}: React.PropsWithChildren<{}>) {
  const [state, setState] = useState<StateContextType>({
    isInitialLoad: true,
    employees: undefined, // assume unfetched data to start
  })

  // Helper function to update state and persist data
  const setStateAndPersist = useCallback(
    (fn: (prev: StateContextType) => StateContextType) => {
      setState(prev => {
        const newState = fn(prev)
        updateEmployeeData(newState.employees ?? [])
        return newState
      })
    },
    [],
  )

  // Initialize employee state from storage or initial data
  const initEmployeesState = useCallback(() => {
    const data = loadEmployeeData()
    setState({
      isInitialLoad: false,
      employees: data.length ? data : initialEmployees,
    })
  }, [])

  // Add a new employee
  const addEmployee = useCallback(
    (employee: Employee) => {
      setStateAndPersist(prev => ({
        ...prev,
        employees: prev.employees ? [...prev.employees, employee] : [employee],
      }))
    },
    [setStateAndPersist],
  )

  // Update an existing employee
  const updateEmployee = useCallback(
    (updatedEmployee: Employee) => {
      setStateAndPersist(prev => ({
        ...prev,
        employees: prev.employees?.map(e =>
          e.id === updatedEmployee.id ? updatedEmployee : e,
        ),
      }))
    },
    [setStateAndPersist],
  )

  // Delete an employee by ID
  const deleteEmployee = useCallback(
    (employeeId: number) => {
      setStateAndPersist(prev => ({
        ...prev,
        employees: prev.employees?.filter(e => e.id !== employeeId),
      }))
    },
    [setStateAndPersist],
  )

  // Add a dependent to an employee
  const addDependent = useCallback(
    (employeeId: number, dependent: Person) => {
      setStateAndPersist(prev => ({
        ...prev,
        employees: prev.employees?.map(e =>
          e.id === employeeId
            ? {...e, dependents: [...e.dependents, dependent]}
            : e,
        ),
      }))
    },
    [setStateAndPersist],
  )

  // Update a dependent
  const updateDependent = useCallback(
    (updatedDependent: Person) => {
      setStateAndPersist(prev => ({
        ...prev,
        employees: prev.employees?.map(e => ({
          ...e,
          dependents: e.dependents.map(d =>
            d.id === updatedDependent.id ? updatedDependent : d,
          ),
        })),
      }))
    },
    [setStateAndPersist],
  )

  // Delete a dependent by ID
  const deleteDependent = useCallback(
    (dependentId: number) => {
      setStateAndPersist(prev => ({
        ...prev,
        employees: prev.employees?.map(e => ({
          ...e,
          dependents: e.dependents.filter(d => d.id !== dependentId),
        })),
      }))
    },
    [setStateAndPersist],
  )

  // Memoize state and API contexts to optimize performance
  const stateContext = useMemo(() => state, [state])
  const apiContext = useMemo(
    () => ({
      initEmployeesState,
      addEmployee,
      updateEmployee,
      deleteEmployee,
      addDependent,
      updateDependent,
      deleteDependent,
    }),
    [
      initEmployeesState,
      addEmployee,
      updateEmployee,
      deleteEmployee,
      addDependent,
      updateDependent,
      deleteDependent,
    ],
  )

  // Provide the contexts to children components
  return (
    <StateContext.Provider value={stateContext}>
      <ApiContext.Provider value={apiContext}>{children}</ApiContext.Provider>
    </StateContext.Provider>
  )
}

// Custom hooks to use the state and API contexts
export const useEmployeesState = () => useContext(StateContext)
export const useEmployeesApi = () => useContext(ApiContext)
