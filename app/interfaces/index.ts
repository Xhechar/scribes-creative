
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  website: string;
  company: {
    name: string;
  }
}

export interface ServiceResponse<T> {
  status: number;
  message: string;
  data?: T[];
}