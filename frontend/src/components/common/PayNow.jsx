import { BUY_PRODUCT } from "@/utils/apiroutes";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

function PayNow({ payNow, setPayNow }) {
    const { toast } = useToast();
    const router = useRouter()
  const [shippingAddress, setShippingAddress] = useState("");
  const [location, setLocation] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [phone, setPhone] = useState("");

  const placeOrder = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(BUY_PRODUCT, {
        productType: payNow.productType,
        productId: payNow.productId,
        shopId: payNow.shopId,
        quantity: payNow.quantity,
        size: payNow.size,
        discount50: payNow.discount50,
        discount10: payNow.discount10,
        balance: payNow.balance,
        shippingAddress,
        location,
        paymentMode,
        phone
      },{
        withCredentials: true,
      });
      if(data.msg === "order placed successfully"){
        toast({
            title: data.msg,
          });
        router.push(`/orderdetails/${data.id}`)
      }
    } catch (err) {
      console.log("Something went wrong", err);
    }
  };

  useEffect(() => {
    if (Object.keys(payNow).length === 0) {
      setPayNow(undefined);
    }
  }, [payNow, setPayNow]);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-70 backdrop-filter backdrop-blur-lg">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[80%] md:w-[50%] lg:min-w-[50%]">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        <form onSubmit={placeOrder}>
          <label className="block mb-2" htmlFor="phone">Phone</label>
          <input
            className="border rounded px-3 py-2 w-full mb-4"
            type="tel"
            id="phone"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <label className="block mb-2" htmlFor="address">Address</label>
          <textarea
            className="border rounded px-3 py-2 w-full mb-4"
            id="address"
            placeholder="Address"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            required
          />
          <label className="block mb-2" htmlFor="location">Location</label>
          <input
            className="border rounded px-3 py-2 w-full mb-4"
            type="text"
            id="location"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <label className="block mb-2">Payment Method</label>
          <div className="mb-4">
            <label className="mr-4">
              <input
                type="radio"
                name="paymentMethod"
                value="cash-on-delivery"
                onChange={(e) => setPaymentMode(e.target.value)}
              />
              <span className="ml-2">Cash on Delivery</span>
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="online"
                onChange={(e) => setPaymentMode(e.target.value)}
              />
              <span className="ml-2">UPI</span>
            </label>
          </div>
          <button
            onClick={()=>setPayNow(false)}
            type="submit"
            className="bg-red-500 mr-5 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default PayNow;
