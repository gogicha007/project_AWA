import { useQuery } from "@tanstack/react-query";
import { sectionsApi } from "../../api/boqSectionsApi";

export const useSectionQueries = () => {
    const { isPending: isPentingSections, isError: isErrorSections, isSuccess: isSuccessSections, data: sectionsData, error: getAllSectionsError } = useQuery({
        queryKey: ['projectSections'],
        queryFn: sectionsApi.getAll,
    })
    return { sectionsData, isPentingSections, isErrorSections, isSuccessSections, getAllSectionsError }
}