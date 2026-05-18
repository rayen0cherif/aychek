export interface Company {
  id: string;
  name: string;
  sector: string;
  country: string;
  description: string;
  foundedYear: number;
  employeeCount: number;
}

export interface AskResponse {
  answer: string;
}
