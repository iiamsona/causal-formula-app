import { useFormulaStore } from "@/store/useFormulaStore.ts";
import { useAutocomplete } from "@/hooks/useAutocomplete.ts";
import { useRef, useState } from "react";
import { Token } from "./Token";
import { LuSquareFunction } from "react-icons/lu";

export const FormulaInput = () => {
  const { tokens, input, setInput, addToken, removeLastToken, removeToken } =
    useFormulaStore();
  const { data: suggestions = [] } = useAutocomplete(input);

  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && suggestions.length > 0) {
      addToken({ id: suggestions[0].id, label: suggestions[0].name });
    }

    if (e.key === "Backspace" && input === "") {
      removeLastToken();
    }
  };

  const removeTokenById = (id: string) => {
    removeToken(id);
  };

  return (
    <div className="relative w-full">
      <div className="flex flex-wrap items-center gap-2 border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
        {tokens.map((token) => (
          <Token key={token.id} token={token} onDelete={removeTokenById}/>
        ))}

        {/* Input wrapper relative for prefix */}
        <div className="relative flex-1 min-w-[100px]">
          {isFocused && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 select-none pointer-events-none">
              =
            </span>
          )}
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`w-full border-none bg-transparent placeholder-gray-400 focus:outline-none ${
              isFocused ? "pl-6" : "pl-2"
            }`}
            placeholder="Enter formula..."
          />
        </div>
      </div>

      {input && suggestions.length > 0 && (
        <ul className="absolute z-50 mt-2 w-full max-w-[300px] bg-white border rounded-lg shadow-lg overflow-y-auto max-h-60 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {suggestions.map((item: any) => (
            <li
              key={item.id}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex gap-2 items-start"
              onClick={() => addToken({ id: item.id, label: item.name })}
            >
              <LuSquareFunction className="mt-1 text-blue-500" />
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-500">{item.category}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
