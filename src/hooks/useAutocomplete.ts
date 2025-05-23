import { useQuery } from "@tanstack/react-query";

interface AutocompleteItem {
  id: string;
  name: string;
  value: string | number;
  category?: string;
  inputs?: string;
}

export const useAutocomplete = (query: string) => {
  return useQuery<AutocompleteItem[]>({
    queryKey: ["autocomplete", query],
    queryFn: async () => {
      const res = await fetch(
        `https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete`
      );
      const data: AutocompleteItem[] = await res.json();
      return data.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
    },
    enabled: query.length > 0,
  });
};
