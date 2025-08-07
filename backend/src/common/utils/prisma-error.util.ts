import { BadRequestException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export function handlePrismaErrors(
  error: unknown,
  actionName: string = '',
  entityName: string = '',
) {
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

  if (error instanceof PrismaClientKnownRequestError)
    throw new BadRequestException(`Database error: ${error.message}`);

  throw new BadRequestException(`Failed to ${actionName} ${entityName}`);
}
