import { useQuery } from "@tanstack/react-query";
import { sectionsApi } from "../../api/boqSectionsApi";

export const useSectionQueries = (projectId: number) => {
    const { isPending: isPendingSections, isError: isErrorSections, isSuccess: isSuccessSections, data: sectionsData, error: getAllSectionsError } = useQuery({
        queryKey: ['projectSectionsByProjectId', projectId],
        queryFn: () => sectionsApi.getAllByProjectId(projectId),
    })
    return { sectionsData, isPendingSections, isErrorSections, isSuccessSections, getAllSectionsError }
}