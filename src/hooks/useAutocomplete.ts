import { useQuery } from '@tanstack/react-query'

interface AutocompleteItem {
  id: string;
  name: string;
  value: string | number;
  inputs?: string;
}

export const useAutocomplete = (query: string) => {
  if (query.length > 0) {
    console.log('Autocomplete query:', query)
  }

  return useQuery<AutocompleteItem[]>({
    queryKey: ['autocomplete', query],
    queryFn: async () => {
      const res = await fetch(
        `https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete`
      )
      const data: AutocompleteItem[] = await res.json()
      const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )
      console.log('Filtered data:', filteredData)
      return filteredData
    },
    enabled: query.length > 0,
  })
}
