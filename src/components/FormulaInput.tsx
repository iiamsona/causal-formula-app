import { useFormulaStore } from "@/store/useFormulaStore.ts";
import { useAutocomplete } from "@/hooks/useAutocomplete.ts";
import { useEffect, useRef } from "react";
import { Token } from "./Token";

export const FormulaInput = () => {
  const { tokens, input, setInput, addToken, removeLastToken } =
    useFormulaStore();
  const { data: suggestions = [] } = useAutocomplete(input);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && suggestions.length > 0) {
      addToken({ id: suggestions[0].id, label: suggestions[0].name });
    }

    if (e.key === "Backspace" && input === "") {
      removeLastToken();
    }
  };

  return (
    <div className="flex flex-wrap items-center border p-2 rounded w-full">
      {tokens.map((token) => (
        <Token key={token.id} token={token} />
      ))}
      <input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="outline-none flex-1 min-w-[100px]"
        placeholder="Enter formula..."
      />
      {input && suggestions.length > 0 && (
        <ul className="absolute mt-10 bg-white shadow-md border rounded z-50 w-[300px]">
          {suggestions.map((item: any) => (
            <div
              key={item.id}
              className="p- hover:bg-gray-100 cursor-pointer"
              onClick={() => addToken({ id: item.id, label: item.name })}
            >
              <div className="flex flex-col">
                <div>{item.name}</div>
                <div className="text-sm text-gray-500">{item.category}</div>
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};
