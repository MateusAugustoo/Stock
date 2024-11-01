import { SearchIcon, SlidersVertical } from "lucide-react";

type InputProps = {
  search: string
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function InputSearchProduct({ search, handleSearch }: InputProps) {
  return (
    <div className="relative col-span-6">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
        <SearchIcon
          size={24}
        />
      </div>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Pesquisar produto"
        className="block w-full py-3 ps-10 rounded-md bg-zinc-200 placeholder:text-center shadow-md shadow-black/30"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        <SlidersVertical 
          size={24}
        />
      </div>
    </div>
  )
}