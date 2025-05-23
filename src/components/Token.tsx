import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

export const Token = ({ token }: { token: { id: string; label: string } }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded mx-1 flex items-center cursor-pointer">
          {token.label}
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="bg-white border shadow-md rounded p-2">
        <DropdownMenu.Item>Option 1</DropdownMenu.Item>
        <DropdownMenu.Item>Option 2</DropdownMenu.Item>
        <DropdownMenu.Item>Delete</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
