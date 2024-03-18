'use client'
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IoAddOutline, IoCartOutline } from 'react-icons/io5'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from '@/components/ui/use-toast';
import { ADD_EXISTING_PRODUCT, ADD_NEW_PRODUCT, GET_CATEGORIES, SEARCH_BY_CATEGORY } from '@/utils/apiroutes';
import axios from 'axios';
import { checkLogin } from '../../utils/generalFunctions';




function AddProduct() {
    const router = useRouter();
   
    useEffect(()=>{
        checkLogin(router)
    },[router])

   
    
    return (
        <>
            <div className='flex p-3 shadow-md shadow-gray-100 justify-between fixed w-full bg-sky-500 z-30'>
                <div className='flex items-center'>
                    <div className='cursor-pointer' onClick={() => router.back()}><ArrowLeftIcon className='size-5' /></div>
                    <div className='ml-4 font-semibold text-[1em]'>Add Product</div>
                </div>
                <div className='flex'>
                    <div>Search</div>
                    <div className='relative ml-4'>
                        <b className='border-[2px] bg-red-600 rounded-full absolute size-5 text-sm flex justify-center items-center text-white right-[-4px] top-[-4px] border-black'>{4}</b>
                        <IoCartOutline className='size-8 mr-1' /></div>
                </div>
            </div>

            <div className='pt-16 w-full p-2'>
                <Tabs defaultValue="general" className="w-full flex flex-col justify-center">
                    <TabsList className='w-fit mx-auto'>
                        <TabsTrigger value="general" className=' w-52 max-w-[48%]'>General Products</TabsTrigger>
                        <TabsTrigger value="fashion" className=' w-52 max-w-[48%]'>Fashion Product</TabsTrigger>
                    </TabsList>
                    <TabsContent value="general" className='border-t-[1px]'>
                        <AddGeneral />
                    </TabsContent>

                    <TabsContent value="fashion" className='border-t-[1px]'>
                        <AddFashion />
                    </TabsContent>
                </Tabs>
            </div>

        </>
    )
}

const AddGeneral = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('')
    const [size, setSize] = useState('');

    const [images, setImages] = useState([]);

    const [productId, setProductId] = useState('');

    const [isNew, setIsNew] = useState(false);
    const [comission, setComission] = useState('')

    useEffect(()=>{
        axios.get(`${GET_CATEGORIES}/general`).then(res=>{
            setCategories(res.data)
        })
    },[])


    async function handleSubmit() {
        const formData = new FormData();
        images.forEach((image, index) => {
            formData.append(`images`, image);
        });
        formData.append('category', category);
        formData.append('name', name);
        formData.append('quantity', quantity);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('size', size);
        formData.append('productType', 'general');


        try {
            let res;
            console.log(isNew)
            if (isNew) {
                console.log('ruk tu', ADD_NEW_PRODUCT)
                res = await axios.post(ADD_NEW_PRODUCT, formData, { withCredentials: true });

                console.log('hm hai', res)

            } else {
                console.log('hlo re')
                res = await axios.post(ADD_EXISTING_PRODUCT, {
                    productId,
                    price,
                    quantity
                }, { withCredentials: true })

                console.log('allagag hai', ADD_EXISTING_PRODUCT ,res)
            }

            toast({
                title: res.data
            })

            setCategory('');
            setName('');
            setQuantity('');
            setDescription('');
            setPrice('');
            setSize('');
            setImages([]);
            setProductId('');
            setIsNew(false);

        } catch (error) {
            console.error('Error uploading images:', error);
        }
    }


    function handleImages(e) {
        const selectedImages = Array.from(e.target.files);
        setImages(selectedImages);

    }

    function handleIsNew() {
        return setIsNew(prev => !prev)
    }
    function handleCategory(value){
        console.log(value)
        setCategory(value.name);
        setComission(value.comission);
        if(isNew){
            return;
        }


    }
    useEffect(()=>{
        console.log(category)
        axios.post(SEARCH_BY_CATEGORY, {category, productType:'general'}, {withCredentials:true}).then(res=>{
            console.log(res)
            if(Array.isArray(res.data)){
            setProducts(res.data)
            }
        })
    },[category])
    useEffect(()=>{console.log(products)},[products])

    return (
        <div className='flex flex-wrap'>
            <div className='p-2'>
                <div className='flex justify-between lg:mb-4'>
                    <h2 className='text-lg font-semibold opacity-70'>Product Images:</h2>
                    <span className='bg-green-600 text-sm font-semibold rounded-3xl py-[2px] px-4 text-white shadow-xl mr-4'>Product View</span>
                </div>

                <div className='flex flex-wrap shadow-md p-2 pt-1 lg:min-h-[70vh] lg:w-[50vw] justify-around lg:justify-start'>
                    {isNew && (
                        <div className='size-24 lg:size-28 bg-slate-200 m-1 mb-2 relative flex justify-center items-center'>
                            <input type="file" className='opacity-0 flex justify-center items-center bg-red-200 size-24 z-10 lg:size-28 border-2' multiple onChange={handleImages} />
                            <IoAddOutline className='size-14 opacity-45 absolute' />
                        </div>)
                    }

                    {images.map((image, index) => (
                        <div key={index} className="size-24 lg:size-28 bg-slate-200 flex justify-center items-center m-1 mb-2">
                            <Image src={URL.createObjectURL(image)} width={100} height={100} alt='img' className='height-full' />
                        </div>
                    ))}

                </div>

            </div>

            <div>
                <div>
                    <h2 className='text-lg font-semibold opacity-70 mt-3'>Product Details:</h2>
                    {comission&&<p className='text-sm font-mono text-red-600 leading-4'>-{comission}% of product's price will be detcucted as platform charge on every order for this product </p>}
                </div>

                <div>
                    {/* <form className='font-medium mt-2 ml-2'> */}
                        <div className='mb-3'>
                            <label htmlFor="lastName">Select Category:</label>
                            <Select  onValueChange={handleCategory}>
                                <SelectTrigger className="opacity-60">
                                    <SelectValue placeholder="Select Category" value={category} />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        categories.map(category=>(
                                            <SelectItem key={category._id} value={{name:category.name, comission:category.platformCharge
                                            }}>{category.name}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>

                        {!isNew && (
                            <div className='mb-3'>
                                <label htmlFor="lastName">Select Product:</label>
                                <Select>
                                    <SelectTrigger className='opacity-60' onChange={e => setProductId(e)}>
                                        <SelectValue placeholder="Select Product" value={productId} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                        products.map(product=>{
                                            <SelectItem value={product._id}>{product.name}</SelectItem>
                                        })
                                        }
                                    </SelectContent>
                                </Select>
                            </div>
                        )
                        }

                        {isNew && (
                            <>
                                <div className='mb-3'>
                                    <label htmlFor="name">Product Name:</label>
                                    <Input
                                        type="text"
                                        name="name"
                                        placeholder="Enter product name"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="quantity">Description:</label>
                                    <Textarea
                                        type="text"
                                        name="description"
                                        placeholder="Enter description"
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                    />
                                </div>

                                <div className='mb-3 flex items-center'>
                                    <Switch className='mr-2' onCheckedChange={e => setSize(e)} /> Enable Sizes
                                </div>
                            </>
                        )}

                        <div className='mb-3'>
                            <label htmlFor="price">Price:</label>
                            <Input
                                type="number"
                                name="price"
                                placeholder="Enter price of product"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="quantity">Quantity:</label>
                            <Input
                                type="number"
                                name="quantity"
                                placeholder="Enter quantity of product"
                                value={quantity}
                                onChange={e => setQuantity(e.target.value)}
                            />
                        </div>

                        <div className='flex w-full justify-around'>
                            <Button className='mt-2 w-32 mb-4' onClick={handleSubmit}>Add</Button>
                            <Button className='mt-2 w-32 mb-4 bg-red-600' onClick={handleIsNew}>{isNew ? 'Add General' : 'Not in list'}</Button>
                        </div>
                    {/* </form> */}
                </div>
            </div>
        </div>
    )
}

const AddFashion = () => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('')
    const [size, setSize] = useState('');

    const [images, setImages] = useState([]);

    useEffect(()=>{
        axios.get(`${GET_CATEGORIES}/fashion`).then(res=>{
            setCategories(res.data)
        })
    },[])


    async function handleSubmit(e) {
        e.prevendDefault()

        const formData = new FormData();
        images.forEach((image, index) => {
            formData.append(`image${index}`, image);
        });
        formData.append('category', category);
        formData.append('name', name);
        formData.append('quantity', quantity);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('size', size);


        try {
            const res = await axios.post(ADD_NEW_PRODUCT, formData, { withCredentials: true });



            toast({
                title: res.data
            })

        } catch (error) {
            console.error('Error uploading images:', error);
        }
    }


    function handleImages(e) {
        const selectedImages = Array.from(e.target.files);
        setImages(selectedImages);

    }

    return (
        <div className='flex flex-wrap'>
            <div className='p-2'>
                <div className='flex justify-between lg:mb-4'>
                    <h2 className='text-lg font-semibold opacity-70'>Product Images:</h2>
                    <span className='bg-green-600 text-sm font-semibold rounded-3xl py-[2px] px-4 text-white shadow-xl mr-4'>Product View</span>
                </div>

                <div className='flex flex-wrap shadow-md p-2 pt-1 lg:min-h-[70vh] lg:w-[50vw] justify-around lg:justify-start'>
                    <div className='size-24 lg:size-28 bg-slate-200 m-1 mb-2 relative flex justify-center items-center'>
                        <input type="file" className='opacity-0 z-10 absolute size-24 lg:size-28 border-2' multiple onChange={handleImages} />
                        <IoAddOutline className='size-14 opacity-45' />
                    </div>

                    {images.map((image, index) => (
                        <div key={index} className="size-24 lg:size-28 bg-slate-200 flex justify-center items-center m-1 mb-2">
                            <Image src={URL.createObjectURL(image)} width={100} height={100} alt='img' className='height-full' />
                        </div>
                    ))}

                </div>

            </div>

            <div>
                <div>
                    <h2 className='text-lg font-semibold opacity-70 mt-3'>Product Details:</h2>
                    <p className='text-sm font-mono text-red-600 leading-4'>-{23}% of product's price will be detcucted as platform charge on every order for this product </p>
                </div>

                <div>

                    <form className='font-medium mt-2 ml-2'>
                        <div className='mb-3'>
                            <label htmlFor="lastName">Select Category:</label>
                            <Select>
                                <SelectTrigger className="opacity-60">
                                    <SelectValue placeholder="Select Category" value={category} onChange={e => setCategory(e.target.value)} />
                                </SelectTrigger>
                                <SelectContent>
                                {
                                        categories.map(category=>(
                                            <SelectItem value="light">Light</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="name">Product Name:</label>
                            <Input
                                type="text"
                                name="name"
                                placeholder="Enter product name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="quantity">Description:</label>
                            <Textarea
                                type="text"
                                name="description"
                                placeholder="Enter description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </div>

                        <div className='mb-3 flex items-center'>
                            <Switch className='mr-2' onCheckedChange={e => setSize(e)} />{size} Enable Sizes
                        </div>



                        <div className='mb-3'>
                            <label htmlFor="price">Price:</label>
                            <Input
                                type="number"
                                name="price"
                                placeholder="Enter price of product"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="quantity">Quantity:</label>
                            <Input
                                type="number"
                                name="quantity"
                                placeholder="Enter quantity of product"
                                value={quantity}
                                onChange={e => setQuantity(e.target.value)}
                            />
                        </div>

                        <div className='flex w-full justify-around'>
                            <Button className='mt-2 w-32 mb-4' type={'submit'} onClick={handleSubmit}>Add</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddProduct