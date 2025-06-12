'use client';


import React, { useState } from 'react'
import DashLayout from '../components/dashboard/dashLayout'
import Container from '../components/common/container'
import NavigateArrow from '../components/common/navigate'
import { CourseCard, Course } from "../components/dashboard/courseCard";
import { Tabs } from "../components/dashboard/secondaryTab";
import { ArrowLeft, GraduationCap } from 'lucide-react'
import Breadcrumb from '../components/checkout/Breadcrumb'
import ProfileBanner from '../components/dashboard/profileBanner'
import TabNavigation from '../components/common/tab';
import { FaGraduationCap } from 'react-icons/fa6';

const mockCourses: Course[] = [
    { title: "Aspen Basic Plus Webinar Course", imageUrl:"assets/dashboard/courseimage.png", progress: 70, status: "Ongoing Course" },
    { title: "Aspen Basic Plus Webinar Course", imageUrl:"assets/dashboard/courseimage.png", progress: 70, status: "Ongoing Course" },
    { title: "Aspen Basic Plus Webinar Course", imageUrl:"assets/dashboard/courseimage.png", progress: 70, status: "Ongoing Course" },
    { title: "Aspen Basic Plus Webinar Course", imageUrl:"assets/dashboard/courseimage.png", progress: 70, status: "Ongoing Course" },
    { title: "Rankine Cycle", imageUrl:"assets/dashboard/courseimage.png", progress: 60, status: "Registered Course" },
    { title: "Otto Cycle", imageUrl:"assets/dashboard/courseimage.png", progress: 100, status: "Completed Course" },
    { title: "Brayton Cycle", imageUrl:"assets/dashboard/courseimage.png", progress: 10, status: "Postponed Course" },
    { title: "Carnot Cycle", imageUrl:"assets/dashboard/courseimage.png", progress: 10, status: "Postponed Course" },
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

      const registeredCount = mockCourses.filter(
        (c) => c.status === "Registered Course" || c.status === "Ongoing Course"
      ).length;
      
      const completedCount = mockCourses.filter(
        (c) => c.status === "Completed Course"
      ).length;
      
      const postponedCount = mockCourses.filter(
        (c) => c.status === "Postponed Course"
      ).length;
      
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
                        avatarUrl="/assets/dashboard/icon.png"
                        // avatarUrl="/assets/dashboard/userprofile.png"
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
                <div className="p-6 mb-4">
                    <div className='w-full h-[64px] flex items-center gap-6 text-[#120A02] border-b-[1.5px] border-[#B6979133]'>
                        <FaGraduationCap size={45} color='#0000008A'/>
                        <h2 className="h-7 text-xl font-bold">Nubyira Learning</h2>
                    </div>
                    <Tabs
                        selected={selectedTab}
                        onSelect={setSelectedTab}
                        tabs={[
                            { label: "Registered Course", count: registeredCount },
                            { label: "Completed Course", count: completedCount },
                            { label: "Postponed Course", count: postponedCount },
                        ]}
                    />
                    <div className="w-full h-[640px] p-[24px] bg-[#FBFAF9] border border-[#F2EDE9] rounded-[12px] grid grid-cols-2 gap-[8px] overflow-auto">
                        {mockCourses
                        .filter((course) => {
                        if (selectedTab === "Registered Course") {
                            return course.status === "Registered Course" || course.status === "Ongoing Course";
                        }
                        return course.status === selectedTab;
                        })
                        .map((course, idx) => (
                        <CourseCard key={idx} course={course} />
                        ))}
                    </div>
                    {/* <div className="w-full h-[640px] p-[24px] bg-[#FBFAF9] border border-[#F2EDE9] rounded-[12px] grid grid-cols-2 gap-[8px] overflow-auto">
                    {mockCourses
                        .filter((course) => course.status === selectedTab)
                        .map((course, idx) => (
                        <CourseCard key={idx} course={course} />
                        ))}
                    </div> */}
                </div>
            </div>

            </Container>
        </div>
    </DashLayout>
  )
}
