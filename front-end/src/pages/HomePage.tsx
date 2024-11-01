import axios from '../utils/axiosConfig';
import { useState, useEffect } from "react"
import { TProductData } from '../types/TProductData'
import { InputSearchProduct } from "../components/inputs/InputSearchProduct";
import { CardProduct } from "../components/CardProduct";
import { CardProfile } from "../components/CardProfile";
import { Link } from "react-router-dom";
import { Plus } from 'lucide-react';

export function HomePage() {
  const regexNumber = /^[0-9]*$/
  const [products, setProducts] = useState<TProductData[]>([])
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
      <div className="flex flex-col gap-5">
        <CardProfile
          name="MateusAugustoo"
          nameEnterprise="Gostosura em pessoa!!"
          photo="https://github.com/MateusAugustoo.png"
        />

        <div className="grid grid-cols-7 items-center">
          <InputSearchProduct
            search={search}
            handleSearch={handleSearch}
          />

          <div className="size-11 flex items-center justify-center bg-zinc-200 p-3 rounded-lg shadow-md shadow-black/30 col-span-1 justify-self-end">
            <Link to={''}>
              <Plus size={32} />
            </Link>
          </div>
        </div>

        <main>
          <ul className='flex flex-col gap-4'>
            {handleFilter().map((p) => (
              <li key={p.code}>
                <CardProduct
                  name={p.name}
                  code={p.code}
                  description={p.description}
                  expirationDate={p.expirationDate}
                  category={p.category}
                  price={p.price}
                  quantity={5}
                />
              </li>
            ))}
          </ul>
        </main>

      </div>
    </>
  )
}