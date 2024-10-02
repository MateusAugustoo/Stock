import axios from "axios";
import { useState, useEffect } from "react"
import { TFormProductData } from '../types/TFromProductData'
import { ButtonBack } from "../components/ButtonBack";
import { SlidersVerticalIcon } from "lucide-react";
import { InputSearchProduct } from "../components/inputs/InputSearchProduct";
import { CardProduct } from "../components/CardProduct";

export function Products() {
  const regexNumber = /^[0-9]*$/
  const [products, setProducts] = useState<TFormProductData[]>([])
  const [search, setSearch] = useState<string>('')
  const [isFiltered, setIsFiltered] = useState<boolean>(false)

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get('http://localhost:3000/get_products')

      setProducts(response.data)
    }

    getProducts()
  }, [])

  useEffect(() => {
    if (search !== '') {
      setIsFiltered(true)
    }
    else {
      setIsFiltered(false)
    }
  }, [search])

  // filter products
  const filteredProductsName = products.filter((product) => {
    return product.name.toLowerCase().includes(search.toLowerCase())
  })

  const filteredProductsCode = products.filter((product) => {
    return product.code.toString().toLowerCase().includes(search.toLowerCase())
  })

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleFilter = () => {
    if (isFiltered) {
      if (regexNumber.test(search)) {
        return filteredProductsCode
      }
      else {
        return filteredProductsName
      }
    }
    else {
      return products
    }
  }
  return (
    <>
      <div className="bg-white h-screen w-screen">
        <header className="bg-[#AAD576] px-4 pt-5 pb-14 flex flex-col gap-9 rounded-b-3xl shadow-slate-950 shadow-sm">
          <div>
            <div className="w-10 h-10">
              <ButtonBack />
            </div>
            <h2 className=" text-2xl font-medium text-center">
              Stock
            </h2>
          </div>

          <div className="grid grid-cols-6 gap-1">
            <InputSearchProduct
              search={search}
              handleSearch={handleSearch}
            />
            <button
              className="border border-black w-full h-[3.161rem] grid-cols-1 rounded-md bg-[#d4d4d4]/[60%] flex items-center justify-center"
            >
              <SlidersVerticalIcon size={25} />
            </button>
          </div>
        </header>

        <ul className="px-4 grid grid-cols-2 gap-5 mt-7">
          {
            handleFilter().map((product, index) => (
              <li key={index}>
                <CardProduct
                  key={product.code}
                  name={product.name}
                  code={product.code}
                  expirationDate={product.expirationDate}
                  price={product.price}
                  category={product.category}
                  quantity={product.quantity}
                  description={product.description}
                />
              </li>
            ))
          }
        </ul>
      </div>
    </>
  )
}