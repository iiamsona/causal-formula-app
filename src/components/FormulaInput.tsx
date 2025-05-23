import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useFormulaStore } from "../store/useFormulaStore";
import { useAutocomplete } from "../hooks/useAutocomplete";
import { useRef, useState, useEffect } from "react";
import { Tag } from "./Tag";
import { LuSquareFunction } from "react-icons/lu";
import { nanoid } from "nanoid";

type SuggestionItem = {
  id: string;
  name: string;
  category?: string;
  value: string | number;
};

type TagItem = {
  id: string;
  label: string;
  value: string | number;
};

function isSuggestionItem(item: any): item is SuggestionItem {
  return typeof item.category === "string" || item.value !== undefined;
}

const OPERATORS = new Set(["+", "-", "*", "/", "^", "(", ")"]);

const safeEval = (expr: string) => {
  try {
    return Function(`"use strict";return (${expr})`)();
  } catch {
    return "Error";
  }
};

export const FormulaInput = () => {
  const { tags, input, setInput, addTag, removeLastTag, removeTag } =
    useFormulaStore();

  const { data: suggestions = [] } = useAutocomplete(input);

  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [result, setResult] = useState<string | number>("");

  useEffect(() => {
    // Build expression from tags + input
    const expr = tags
      .map((tag) => (tag.value !== "" && tag.value !== undefined ? tag.value : 0))
      .join("") + input;
    if (expr.trim() === "") {
      setResult("");
      return;
    }
    const safeExpr = expr
      .toString()
      .replace(/[^-()\d/*+.^\s]/g, "");

    const val = safeEval(safeExpr);
    setResult(val);
  }, [tags, input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const val = input.trim();

    if (e.key === "Enter") {
      if (suggestions.length > 0) {
        const s = suggestions[0];
        addTag({ id: s.id, label: s.name, value: s.value });
        setInput("");
      } else if (val !== "") {
        // If val is a single operator or digit, add as tag normally
        if (/^\d+$/.test(val) || OPERATORS.has(val)) {
          addTag({ id: val, label: val, value: val });
          setInput("");
        } else {
          // Otherwise, add the whole input as one tag with unique id
          addTag({ id: nanoid(), label: val, value: val });
          setInput("");
        }
      }
      e.preventDefault();
    }

    if (e.key === "Backspace" && input === "") {
      removeLastTag();
      e.preventDefault();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if (
      val.length === 1 &&
      (OPERATORS.has(val) || /^\d$/.test(val)) &&
      input === ""
    ) {
      addTag({ id: val, label: val, value: val });
      setInput("");
      return;
    }

    setInput(val);
  };

  const removeTagById = (id: string) => {
    removeTag(id);
  };

  return (
    <div className="relative w-full">
      <div className="flex flex-wrap items-center gap-2 border rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
        <div className="relative flex flex-wrap items-center gap-2 flex-1 min-w-[100px]">
          {isFocused && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 select-none pointer-events-none">
              =
            </span>
          )}
          <div className={`flex flex-wrap items-center gap-2 w-full ${isFocused ? "pl-4" : ""}`}>
            {tags.map((tag: TagItem) => (
              <Tag key={tag.id} tag={tag} onDelete={removeTagById} />
            ))}
            <input
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="flex-1 min-w-[100px] border-none bg-transparent placeholder-gray-400 focus:outline-none"
              placeholder="Enter formula..."
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </div>
      </div>

      {input && suggestions.length > 0 && (
        <ul className="absolute z-50 mt-2 w-full max-w-[300px] bg-white border rounded-lg shadow-lg overflow-y-auto max-h-60 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {suggestions.map((item) => (
            <li
              key={item.id}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex gap-2 items-start"
              onClick={() => addTag({ id: item.id, label: item.name, value: item.value })}
            >
              <LuSquareFunction className="mt-1 text-blue-500" />
              <div>
                <div className="font-medium">{item.name}</div>
                {isSuggestionItem(item) && (
                  <div className="text-sm text-gray-500">{item.category}</div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-3 font-semibold text-lg text-right">
        Result: {result}
      </div>
    </div>
  );
};
