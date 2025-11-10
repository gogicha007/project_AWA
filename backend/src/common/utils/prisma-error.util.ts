import { BadRequestException, NotFoundException } from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError
} from '@prisma/client/runtime/library';

export function handlePrismaErrors(
  error: unknown,
  actionName: string = '',
  entityName: string = '',
) {
  if (
    error instanceof PrismaClientValidationError ||
    (error &&
      typeof error === 'object' &&
      'name' in error &&
      error.name === 'PrismaClientValidationError') ||
    (error &&
      typeof error === 'object' &&
      error.constructor?.name === 'PrismaClientValidationError')
  ) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : typeof error === 'string'
          ? error
          : JSON.stringify(error);

    if (errorMessage.includes('Expected ISO-8601 DateTime')) {
      throw new BadRequestException(
        'Invalid date format. Please use ISO-8601 format (e.g., "2025-06-12T12:00:00.000Z")',
      );
    }

    throw new BadRequestException(`Validation error: ${errorMessage}`);
  }

  if (
    error instanceof PrismaClientKnownRequestError &&
    error.code === 'P2025'
  ) {
    throw new NotFoundException(
      `${entityName || 'Record'} not found${actionName ? ` for ${actionName}` : ''}`,
    );
  }

  if (
    error instanceof PrismaClientKnownRequestError &&
    error.code === 'P2003'
  ) {
    const fieldName =
      typeof error.meta?.field_name === 'string'
        ? error.meta.field_name
        : JSON.stringify(error.meta?.field_name) || 'unknown field';
    throw new BadRequestException(
      `Foreign key constraint failed on the field: ${fieldName}`,
    );
  }

  if (error instanceof PrismaClientKnownRequestError && error.code === 'P2009')
    throw new BadRequestException('Invalid input data');

  if (
    error instanceof PrismaClientKnownRequestError ||
    error instanceof PrismaClientUnknownRequestError ||
    error instanceof PrismaClientRustPanicError ||
    error instanceof PrismaClientInitializationError
  ) {
    const errorCode =
      error instanceof PrismaClientKnownRequestError
        ? error.code
        : error.name || 'Unknown error';
    throw new BadRequestException(
      `Failed to ${actionName} ${entityName}: ${errorCode}`,
    );
  }

  console.log(error);
  throw new BadRequestException(`Failed to ${actionName} ${entityName}`);
}
