import React from 'react'
import CategoryImage from './CategoryImage'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const CategoryBar = () => {
  return (
    <>
    <div className='w-full flex justify-center my-5'>
      <div className='w-[95%] bg-accent py-2 flex justify-between md:px-12 px-6 gap-6 font-semibold overflow-scroll no-scrollbar rounded-lg'>
          <CategoryImage imageLink="./grocery1.jpg">Grocery</CategoryImage> 
          <CategoryImage imageLink="https://img.freepik.com/free-vector/isolated-mobile-phone-background_1132-137.jpg?t=st=1709403275~exp=1709406875~hmac=a742970d30cf45d0c649392ec259b24072c8250c00ae875efd63abda539dd8c1&w=740">Mobiles</CategoryImage> 
          <CategoryImage imageLink='https://img.freepik.com/free-photo/beautiful-young-woman-colorful-jacket_140725-13007.jpg?t=st=1709403335~exp=1709406935~hmac=50538cc95e5256aaca35e9c396453edb411f522dcd61067f902b1fdd15dfc4b1&w=996'><DropdownMenu>
  <DropdownMenuTrigger>Fashion</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account </DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem>Subscription</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
</CategoryImage> 
          <CategoryImage imageLink="https://img.freepik.com/free-photo/still-life-casual-man-modern-male-accessories-laptop-white_155003-3938.jpg?t=st=1709403752~exp=1709407352~hmac=543f64ef0d793b1142a19d9ead24e376eaeb85892944d9d2de0941b44ff723ce&w=996">Electronics</CategoryImage> 
          <CategoryImage imageLink="https://img.freepik.com/free-vector/chair-realistic-illustration_1284-9507.jpg?t=st=1709403818~exp=1709407418~hmac=69b3481473434680b164503afe7fd47314366e074ce87daadc0979bba49e4388&w=740">Furniture</CategoryImage> 
          <CategoryImage imageLink="https://img.freepik.com/free-photo/fluffy-toy-texture-close-up_23-2149686884.jpg?t=st=1709403899~exp=1709407499~hmac=fc71755a476af64d3b238cacce126b5a1289fb6de1666a1bcc0037e61fc464be&w=996">Toys</CategoryImage> 
          <CategoryImage imageLink="https://img.freepik.com/free-vector/household-appliances-gift-realistic_1284-65309.jpg?t=st=1709404225~exp=1709407825~hmac=35c1115f89e3827e9d7b2ae0d4de3699b7a6ea7210a55723f7aa72a7703b9808&w=900">Appliances</CategoryImage> 
      </div>
    </div>
    </>
  )
}

export default CategoryBar
