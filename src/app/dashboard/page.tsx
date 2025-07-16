'use client';


import React, { useState } from 'react'
import DashLayout from '../components/dashboard/dashLayout'
import Container from '../components/common/container'
import NavigateArrow from '../components/common/navigate'
import { CourseCard, Course } from "../components/dashboard/courseCard";
import { Tabs } from "../components/dashboard/secondaryTab";
import { ArrowLeft } from 'lucide-react'
import Breadcrumb from '../components/checkout/Breadcrumb'
import ProfileBanner from '../components/dashboard/profileBanner'
import TabNavigation from '../components/common/tab';
import { FaGraduationCap } from 'react-icons/fa6';
import { MdOutlineAssignment } from 'react-icons/md'; // Material Icons
import SectionHeader from '../components/dashboard/sectionHeader';
import EmptyPlaceholder from '../components/dashboard/NoCoursesPlaceholder';
import PrimaryButton from '../components/dashboard/dashButton';

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

// Temporary fallback to prevent errors
// const mockCourses: Course[] = [];

export default function Dashboard() {

    const [activeTab, setActiveTab] = useState("learning");
    const [selectedTab, setSelectedTab] = useState("Registered Course");

      const handleSectionChange = (key: string) => {
        console.log('Active tab:', key);
        setActiveTab(key);
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

      const filteredCourses = mockCourses.filter((course) => {
        if (selectedTab === "Registered Course") {
          return course.status === "Registered Course" || course.status === "Ongoing Course";
        }
        return course.status === selectedTab;
      });
      
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

                <div className="w-full flex flex-col gap-6">
                    <div className="p-4">
                        <ProfileBanner
                            fullName="John Doe Adeyemo"
                            email="jondoe@gmail.com"
                            avatarUrl="/assets/dashboard/icon.png"
                        />
                    </div>
                    <div className="p-2">
                        <TabNavigation
                            tabs={[
                            { label: 'Learning', key: 'learning' },
                            { label: 'Subscription', key: 'subscription' },
                            { label: 'Saved Blog Posts', key: 'saved' },
                            ]}
                            onTabChange={handleSectionChange}
                        />
                    </div>
                    <div className="p-6 mb-4">
                        {activeTab === 'learning' && (
                            <>
                            <SectionHeader
                                icon={<FaGraduationCap size={45} color="#0000008A" />}
                                title="Learning"
                            />
                            <Tabs
                                selected={selectedTab}
                                onSelect={setSelectedTab}
                                tabs={[
                                { label: "Registered Course", count: registeredCount },
                                { label: "Completed Course", count: completedCount },
                                { label: "Postponed Course", count: postponedCount },
                                ]}
                            />
                            <div className="w-full p-[24px] bg-[#FBFAF9] border border-[#F2EDE9] rounded-[12px] overflow-auto">
                                {filteredCourses.length > 0 ? (
                                <div className="grid grid-cols-2 gap-[8px]">
                                    {filteredCourses.map((course, idx) => (
                                    <CourseCard key={idx} course={course} />
                                    ))}
                                </div>
                                ) : (
                                    <div className="bg-[#FBFAF9] flex flex-col py-[60px] px-[24px] items-center justify-center space-y-4">
                                        <EmptyPlaceholder
                                            title={`No ${selectedTab}s`}
                                            description="Browse courses to get started"
                                        />
                                        <PrimaryButton text="Browse Course" href="/learning"/>
                                    </div>
                                
                                )}
                            </div>
                            </>
                        )}

                        {activeTab === 'subscription' && (
                            <>
                            <SectionHeader
                                icon={<MdOutlineAssignment size={45} color="black" />}
                                title="Subscription"
                                className='mb-12'
                            />
                            <div className="bg-[#FBFAF9] flex flex-col py-[60px] px-[24px] items-center justify-center space-y-4">
                            < EmptyPlaceholder
                                title={`Get full access to Nubyira project reports and reference files`}
                                description="Subscription Status"
                                badgeText="Inactive"
                            />
                            <PrimaryButton text="Subscribe Now" href="/dashboard/subscribe" variant="brown" />
                            </div>
                            </>
                        )}

                        {activeTab === 'saved' && (
                            <>
                            <SectionHeader
                                title="Saved Blog Posts"
                                className='mb-12'
                            />
                            <div className="bg-[#FBFAF9] flex flex-col py-[60px] px-[24px] items-center justify-center space-y-4">
                            < EmptyPlaceholder
                                title="No Saved blog posts yet"
                                description="Click to see blogs"
                            />
                            <PrimaryButton text="View Blogs" href="/blogs"/>
                            </div>
                            </>
                        )}

                        
                    </div>

                </div>

            </Container>
        </div>
    </DashLayout>
  )
}
