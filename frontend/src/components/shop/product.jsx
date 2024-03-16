import Icons from '@/utils/icons';
import React from 'react'
import { useToast } from '../ui/use-toast';

function ProductCard({name, brand, price,imgUrl}) {
    const {toast} = useToast()
    const handleClick = (productUrl) => {
       toast({
        title:'feature comming soon...',
        description:'please wait'
       })
      }

    return (
        <>
            <div className="pro" onClick={() => handleClick('singlepro2.html')}>
                <img src={imgUrl || "../images/cart-img/f2.jpg"} alt="" />
                <div className="des">
                    <span>{brand || 'adidas'}</span>
                    <h5>{name || 'Cartoon Astronaut T-shirt'}</h5>
                    <div className="star">
                        {[...Array(5)].map((_, index) => (
                            <i key={index} className="fas fa-star"></i>
                        ))}
                    </div>
                    <h4>{`₹${price || '450'}`}</h4>
                </div>
                <p className='cart p-2'>
                <Icons.Order className='fa-solid size-6'/>
                </p>
            </div>
        </>
    )
}

export default ProductCard