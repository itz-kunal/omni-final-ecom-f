'use client'
import LoadingLayout from '@/components/common/LoadingLayout';
import SearchedProductCard from '@/components/main/ProductCards/SearchedProductCard';
import BackSearchCartHeader from '@/components/main/headers/BackSearchCart';
import { SEARCH_BY_CATEGORY, SEARCH_PRODUCTS } from '@/utils/apiroutes';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Page({ searchParams }) {
    const { searchedKey, category, productType } = searchParams;

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true)

    async function fetchData() {
        try {
            let res;
            if (searchedKey) {
                res = await axios.post(SEARCH_PRODUCTS, { searchedKey }, { withCredentials: true })
            } else if (category) {
                res = await axios.post(SEARCH_BY_CATEGORY, { category, productType }, { withCredentials: true })
            } else {
                res = { data: [] }
            }
          
            setProducts(res.data)
            setLoading(false)
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }

    useEffect(() => {
        fetchData()
        console.log(searchedKey)
    }, [searchParams])

    if (loading) {
        return (
            <LoadingLayout/>
        )
    }
    return (
        <>
            <BackSearchCartHeader />
            <div className='p-2 flex flex-wrap justify-around pt-16'>
                {
                    products.length > 0 ? (
                        products.map(product => (
                            <SearchedProductCard
                                key={product._id}
                                id={product._id}
                                price={product.price}
                                name={product.name}
                                image={product.image[0]}
                            />
                        ))) : (
                        <>No Matching Products</>
                    )
                }
            </div>

        </>
    )
}

export default Page
