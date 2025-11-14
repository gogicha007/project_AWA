import apiClient from "@/api/api-client";
import { handleApiError } from "@/utils/handleApiError";
import { SectionSchema } from "../project-boq/schema/sectionSchema";
import { z } from 'zod'

export type BoqSectionDTO = z.infer<typeof SectionSchema>

export const sectionsApi = {
    getAll: async (): Promise<BoqSectionDTO[]> => {
        try {
            const response = await apiClient.get('/boq-sections');
            return response.data;
        } catch (error) {
            handleApiError(error)
        }

    },

    creactBoqSection: async (section: BoqSectionDTO) => {
        try {
            const createSectionResponse = await apiClient.post('/boq-sections', {
                section
            })
            return createSectionResponse.data
        } catch (error) {
            handleApiError(error)
        }

    },

    createBoqSectionsInBulk: async (sections: BoqSectionDTO[]) => {
        try {
            const createSectionsResopnse = await apiClient.post('/boq-sections/bulk', {
                sections
            });
            return createSectionsResopnse.data
        } catch (error) {
            handleApiError(error)
        }
    },

    update: async (section: BoqSectionDTO, userId: number): Promise<BoqSectionDTO> => {
        try {
            const response = await apiClient.put(`/boq-sections/${section.id}`, {
                ...section,
                userId
            });
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },

    delete: async (id: number) => {
        try {
            const response = await apiClient.delete(`/boq-sections/${id}`)
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    }


};