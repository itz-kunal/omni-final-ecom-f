

const Card = ({ name, price, bg, image }) => {
  return (
    <>
      <div className={`flex flex-col border-2 md:w-[32%] w-[45%] rounded-lg overflow-hidden`}>
        <div className=' md:h-[200px] h-[120px] rounded-lg bg-cover bg-center' style={{ backgroundImage: `url(${image})` }}>
        </div>

        <div className={`flex flex-col items-center ${bg?'bg-white':''}`}>

          <div className='w-full text-center overflow-ellipsis mt-2 opacity-90 text-sm px-1'>
            <p className={`line-clamp-2 leading-4 pb-[2.5px]`}>
             {name || 'not set yet llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll kl'}
            </p>
          </div>

          <h2 className='font-semibold'>₹{price || 'not set' }</h2>
        </div>
      </div>
    </>
  )
}



export default Card
