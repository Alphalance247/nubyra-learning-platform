'use client';


import React, { useState } from 'react'
import DashLayout from '../components/dashboard/dashLayout'
import Container from '../components/common/container'
import NavigateArrow from '../components/common/navigate'
import { CourseCard, Course } from "../components/dashboard/courseCard";
import { Tabs } from "../components/dashboard/secondaryTab";
import { ArrowLeft, GraduationCap } from 'lucide-react'
import Breadcrumb from '../components/checkout/Breadcrumb'
import ProfileBanner from '../components/common/profileBanner'
import TabNavigation from '../components/common/tab';
import { FaGraduationCap } from 'react-icons/fa6';

const mockCourses: Course[] = [
    { title: "Aspen Basic Plus Webinar Course", progress: 70, status: "Ongoing Course" },
    { title: "Aspen Basic Plus Webinar Course", progress: 70, status: "Ongoing Course" },
    { title: "Aspen Basic Plus Webinar Course", progress: 70, status: "Ongoing Course" },
    { title: "Aspen Basic Plus Webinar Course", progress: 70, status: "Ongoing Course" },
  ];

export default function Dashboard() {

    const [selectedTab, setSelectedTab] = useState("Registered Course");

    const handleEdit = () => {
        console.log('Edit Profile clicked');
      };
    
      const handleChangePassword = () => {
        console.log('Change Password clicked');
      };

      const handleTabChange = (key: string) => {
        console.log('Active tab:', key);
      };

  return (
    <DashLayout>
        <div className='bg-[#FEFEFD] pb-6'>    
            <Container>
            <div className=" bg-[#FEFEFD] max-w-full md:max-w-[1200px] w-full mx-auto gap-8 px-4 py-6 space-y-6">
                {/* Back navigation */}
                <NavigateArrow 
                icon={<ArrowLeft size={16} />}
                label={<span className="text-sm font-medium">Back</span>}
                />

                {/* Breadcrumb trail */}
                <Breadcrumb previousStep="Home" currentStep="Dashboard" />
            </div>

            <div className="w-full h-[1234px] flex flex-col gap-6">
                <div className="p-4">
                    <ProfileBanner
                        fullName="John Doe Adeyemo"
                        email="jondoe@gmail.com"
                        avatarUrl="/assets/dashboard/userprofile.png"
                        onEditProfile={handleEdit}
                        onChangePassword={handleChangePassword}
                    />
                </div>
                <div className="p-2">
                    <TabNavigation
                        tabs={[
                        { label: 'Nubyira Learning', key: 'learning' },
                        { label: 'Projects', key: 'projects' },
                        { label: 'Saved Blog Posts', key: 'saved' },
                        ]}
                        onTabChange={handleTabChange}
                    />
                </div>
                <div className="p-6">
                    <div className='w-full h-[64px] flex items-center gap-6 text-[#120A02] border-b-[1.5px] border-[#B6979133]'>
                        <FaGraduationCap size={45} color='#0000008A'/>
                        <h2 className="h-7 text-xl font-bold">Nubyira Learning</h2>
                    </div>
                    <Tabs selected={selectedTab} onSelect={setSelectedTab} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {mockCourses.map((course, idx) => (
                        <CourseCard key={idx} course={course} />
                        ))}
                    </div>
                </div>
            </div>

            </Container>
        </div>
    </DashLayout>
  )
}
