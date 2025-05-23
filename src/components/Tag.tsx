import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export type TagProps = {
  tag: { id: string; label: string };
  onDelete: (id: string) => void;
};

export const Tag = ({ tag, onDelete }: TagProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded mx-1 flex items-center cursor-pointer">
          {tag.label}
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="bg-white border shadow-md rounded p-2">
        <DropdownMenu.Item
          onSelect={() => onDelete(tag.id)}
          className="cursor-pointer select-none px-2 py-1 rounded hover:bg-red-100 text-red-600"
        >
          Delete
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
