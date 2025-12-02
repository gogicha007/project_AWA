import { currencyApi } from "@/api/endpoints/settings/master-dataApi";
import { useQuery } from "@tanstack/react-query";

export const useCurrencyQueries = (currencyId: number) => {
    const { data: currency } = useQuery({
        queryKey: ['currencyById', currencyId],
        queryFn: () => currencyApi.getById(currencyId)
    })
    return { currency }
}