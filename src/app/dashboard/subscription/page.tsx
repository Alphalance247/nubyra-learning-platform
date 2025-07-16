// import DashLayout from '@/app/components/dashboard/dashLayout';
// import PaymentMethodSelector from '../../components/checkout/PaymentMethod';
// import PremiumSubscription from '../../components/dashboard/Subscription';
// import Container from '@/app/components/common/container';
// import NavigateArrow from '@/app/components/common/navigate';
// import { ArrowLeft } from 'lucide-react';
// import Breadcrumb from '@/app/components/checkout/Breadcrumb';

// export default function DashboardPage() {
//   return (
//     <DashLayout>
//         <div className='bg-[#FEFEFD] pb-6'>
//             <Container>
//                 <div className=" bg-[#FEFEFD] max-w-full md:max-w-[1200px] w-full mx-auto gap-8 px-4 py-6 space-y-6">
//                     <NavigateArrow 
//                     icon={<ArrowLeft size={16} />}
//                     label={<span className="text-sm font-medium">Back</span>}
//                     />

//                     <Breadcrumb previousStep="Dashboard" currentStep="Edit Profile" />
//                 </div>
//                 <div className="flex flex-col gap-[32px] items-center">
//                     <PremiumSubscription 
//                         tokenPrice={50}
//                         couponDiscount={10}
//                     />
//                     <PaymentMethodSelector />
//                 </div>
//             </Container>
//         </div>   
//     </DashLayout>
//   );
// }


import DashLayout from '@/app/components/dashboard/dashLayout';
import PaymentMethodSelector from '../../components/checkout/PaymentMethod';
import PremiumSubscription from '../../components/dashboard/Subscription';
import Container from '@/app/components/common/container';
import NavigateArrow from '@/app/components/common/navigate';
import { ArrowLeft } from 'lucide-react';
import Breadcrumb from '@/app/components/checkout/Breadcrumb';

export default function DashboardPage() {
  return (
    <DashLayout>
      <div className="bg-[#FEFEFD] pb-6">
        <Container>
          <div className="bg-[#FEFEFD] max-w-full md:max-w-[1200px] w-full mx-auto gap-8 px-4 py-6 space-y-6">
            <NavigateArrow
              icon={<ArrowLeft size={16} />}
              label={<span className="text-sm font-medium">Back</span>}
            />
            <Breadcrumb previousStep="Dashboard" currentStep="Premium Subscription" />
          </div>

          {/* Ensure 615px centered width for components */}
          <div className="flex flex-col gap-[32px] items-center">
            <div className="w-full max-w-[615px]">
              <PremiumSubscription tokenPrice={30} couponDiscount={0} />
            </div>
            <div className="w-full max-w-[615px]">
              <PaymentMethodSelector />
            </div>
          </div>
        </Container>
      </div>
    </DashLayout>
  );
}

