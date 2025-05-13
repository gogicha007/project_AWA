export interface UserCreateDTO {
  email: string;
  displayName?: string;
  photoURL?: string;
  uid: string;
}

export interface UserResponseDTO {
  id: string;
  email: string;
  displayName: string;
  role: string;
}

export interface MaterialGroupDTO {
  id?: string;
  name: string;
  description: string;
}
