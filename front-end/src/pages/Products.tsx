import axios from "axios";
import { useState, useEffect } from "react"

type TProduct = {
  name: string
  code: number;
  expirationDate: Date;
  category: string;
  quantity: number;
  price: number;
  description: string;
}

export function Products() {
  const regexNumber = /^[0-9]*$/
  const [products, setProducts] = useState<TProduct[]>([])
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
    e.preventDefault()
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
      <div>
        <input type="text" value={search} onChange={handleSearch} />

        <ul>
          {
            handleFilter()?.map((product) => (
              <li key={product.code}>
                {product.name}
              </li>
            ))
          }
        </ul>
      </div>
    </>
  )
}