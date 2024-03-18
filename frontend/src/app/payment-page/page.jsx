import React from 'react';
import QRCode from 'react-qr-code';

function PaymentPage() {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold mb-4">Scan QR Code to Pay</h1>
                <QRCode value={`upi://pay?pa=9664177821@ibl&pn=TREKOMI PRIVATE LIMITED&mc=0000&mode=02&purpose=00`} size={256} /> <br /><br />
                <b>OR, Pay on following UPI Id :</b>
                <p className="mt-4">9664177821@ybl </p>
            </div>
        </>
    )
}

export default PaymentPage