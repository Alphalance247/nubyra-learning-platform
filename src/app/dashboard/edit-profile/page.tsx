import DashLayout from '@/app/components/dashboard/dashLayout';
import EditProfileSection from '../../components/dashboard/editProfileSection';
import Container from '@/app/components/common/container';
import NavigateArrow from '@/app/components/common/navigate';
import { ArrowLeft } from 'lucide-react';
import Breadcrumb from '@/app/components/checkout/Breadcrumb';
import ProtectedRoute from '@/app/components/common/protectedRoute';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashLayout>
        <div className="bg-[#FEFEFD] pb-6">
          <Container>
            <div className="max-w-full md:max-w-[1200px] w-full mx-auto gap-8 px-4 py-6 space-y-6">
              <NavigateArrow
                icon={<ArrowLeft size={16} />}
                label={<span className="text-sm font-medium">Back</span>}
              />
              <Breadcrumb previousStep="Dashboard" currentStep="Edit Profile" />
            </div>

            <main className="p-6 bg-gray-50">
              <EditProfileSection />
            </main>
          </Container>
        </div>
      </DashLayout>
    </ProtectedRoute>
  );
}
