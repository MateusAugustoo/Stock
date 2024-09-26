import { SearchIcon } from "lucide-react";

type InputProps = {
  search: string
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function InputSearchProduct({ search, handleSearch }: InputProps) {
  return (
    <div className="relative col-span-5">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
        <SearchIcon
          size={24}
          className="text-[#79747e]"
        />
      </div>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Pesquisar produto"
        className="block w-full py-3 ps-10 rounded-md border border-black bg-[#d4d4d4]/[60%] placeholder:text-center"
      />
    </div>
  )
}