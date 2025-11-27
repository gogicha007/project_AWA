import { useQuery } from "@tanstack/react-query";
import { sectionsApi } from "../../api/boqSectionsApi";

export const useSectionQueries = (projectId: number) => {
    const { isPending: isPentingSections, isError: isErrorSections, isSuccess: isSuccessSections, data: sectionsData, error: getAllSectionsError } = useQuery({
        queryKey: ['projectSections', projectId],
        queryFn: sectionsApi.getAllByProjectId,
    })
    return { sectionsData, isPentingSections, isErrorSections, isSuccessSections, getAllSectionsError }
}