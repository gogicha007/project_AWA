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
  id?: number;
  name: string;
  description: string;
}

export interface MaterialTypeDTO {
  id?: number;
  type: string;
  groupId: number;
}

export interface UnitDTO {
  id?: number;
  unit: string;
}

export interface MaterialNameDTO {
  id?: number;
  name: string;
  dn: string;
  pn: string;
  degree?: number;
  typeId: number;
  description?: string;
}
