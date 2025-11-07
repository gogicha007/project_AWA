import apiClient from "@/api/api-client";
import { SectionSchema } from "../schema/sectionSchema";
import { z } from 'zod'

export const sectionsApi = {
    getAll: async (): Promise<z.infer<typeof SectionSchema>[]> => {
        const response = await apiClient.get('/boq-sections');
        return response.data;
    }
};