import React from 'react';

type PremiumSubscriptionProps = {
  tokenPrice?: number;
  couponDiscount?: number;
  className?: string;
};

const PremiumSubscription: React.FC<PremiumSubscriptionProps> = ({
  tokenPrice = 30,
  couponDiscount = 0,
  className = '',
}) => {
  const totalPayment = tokenPrice - couponDiscount;

  return (
    <>
        <h2 className="text-2xl font-bold font-[Montserrat] text-[#5F5F5F] text-center mb-4">Premium Subscription</h2>
        <div className={`bg-white max-w-[615px] rounded-lg shadow-md p-6 ${className}`}>
        
        <div className="rounded-[12px] border-b-2 gap-6 bg-[#FFFFFF] border-[#F2EDE9]">
            <div className="rounded-[6px] p-[24px] gap-6 border-[#F2EDE9] bg-[#FBFAF9]">
                
                <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex gap-10 py-3">
                    <span className="w-[160px] font-[Inter] text-[#413B35] text-[18px]">Token:</span>
                    <span className="font-bold font-[Inter] text-lg text-[#120A02]">
                    ${tokenPrice.toFixed(2)}
                    </span>
                </div>
                </div>

                <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex gap-10 py-3">
                    <span className="w-[160px] font-[Inter] text-[#413B35] text-[18px]">Coupon Code:</span>
                    <span className="font-bold font-[Inter] text-lg text-[#120A02]">
                    ${couponDiscount.toFixed(2)}
                    </span>
                </div>
                </div>

                <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex gap-10 py-3">
                    <span className="w-[160px] font-[Inter] text-[#413B35] text-[18px]">Total Payment:</span>
                    <span className="font-bold font-[Inter] text-lg text-[#120A02]">
                    ${totalPayment.toFixed(2)}
                    </span>
                </div>
                </div>
            </div>
            </div>
        </div>
    </>
  );
};

export default PremiumSubscription; 