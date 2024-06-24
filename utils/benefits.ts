import {
  BASE_COST,
  DEPENDENT_COST,
  DISCOUNT,
  GROSS_PAYCHECK,
  PAYCHECKS_PER_YEAR,
} from '../constants'
import {Employee} from '../types/types'

export const calculateBenefits = (employee: Employee) => {
  let totalCost = BASE_COST

  // Apply discount if the employee's name starts with 'A'
  if (employee.name.startsWith('A')) {
    totalCost -= totalCost * DISCOUNT
  }

  // Calculate the cost for each dependent
  employee.dependents.forEach(dependent => {
    let dependentCost = DEPENDENT_COST

    // Apply discount if the dependent's name starts with 'A'
    if (dependent.name.startsWith('A')) {
      dependentCost -= dependentCost * DISCOUNT
    }

    totalCost += dependentCost
  })

  return totalCost / PAYCHECKS_PER_YEAR
}

export const calculateNetPaycheck = (employee: Employee) => {
  const benefitCost = calculateBenefits(employee)
  return GROSS_PAYCHECK - benefitCost
}
