export const PROJECT_STATUSES = ['active', 'completed', 'onHold', 'inProgress'] as const;
export type ProjectStatus = typeof PROJECT_STATUSES[number];
