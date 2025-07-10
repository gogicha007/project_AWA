export interface DeleteOperationResult {
  success: boolean;
  deletedCount?: number;
  message: string;
}

export interface CreateOperationResult {
  success: boolean;
  createdCount?: number;
  message: string;
}

export interface UpdateOperationResult {
  success: boolean;
  updatedCount?: number;
  message: string;
}

export interface FintOperationResult {
  success: boolean;
  searchCount?: number;
  message: string;
}
