import {Employee} from './types/types'

export const initialEmployees: Employee[] = [
  {
    id: 1,
    name: 'James Smith',
    dependents: [
      {
        id: 11,
        name: 'Emily Smith',
      },
      {
        id: 12,
        name: 'Michael Smith',
      },
    ],
  },
  {
    id: 2,
    name: 'Alexander Johnson',
    dependents: [
      {
        id: 21,
        name: 'Sophia Johnson',
      },
    ],
  },
]
