declare namespace Cypress {
  interface Chainable {
    login(userType: 'standard_user' | 'locked_out_user' | 'problem_user' | 
          'performance_glitch_user' | 'error_user' | 'visual_user'): void
  }
}

export interface User {
  username: string
  password: string
}

export interface Users {
  standard_user: User
  locked_out_user: User
  problem_user: User
  performance_glitch_user: User
  error_user: User
  visual_user: User
}

export type TNames = string[];

export type TPrices = number[];

export interface IDataOrder {
    firstName: string,
    lastName: string,
    postalCode: string
}