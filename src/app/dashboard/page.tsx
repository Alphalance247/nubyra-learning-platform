"use client";
import React, { useEffect, useState } from "react";
import DashLayout from "../components/dashboard/dashLayout";
import Container from "../components/common/container";
import NavigateArrow from "../components/common/navigate";
import { CourseCard, Course } from "../components/dashboard/courseCard";
import { Tabs } from "../components/dashboard/secondaryTab";
import Breadcrumb from "../components/checkout/Breadcrumb";
import ProfileBanner from "../components/dashboard/profileBanner";
import TabNavigation from "../components/common/tab";
import { FaGraduationCap } from "react-icons/fa6";
import { MdOutlineAssignment } from "react-icons/md";
import SectionHeader from "../components/dashboard/sectionHeader";
import EmptyPlaceholder from "../components/dashboard/NoCoursesPlaceholder";
import PrimaryButton from "../components/dashboard/dashButton";
import ProtectedRoute from "../components/common/protectedRoute";
import { environment } from "../env/env.local";
import { BsArrowLeft } from "react-icons/bs";
import axiosInstance from "@/app/utils/axios";

interface RegisteredCourse {
  id: number;
  course_title: string;
  status: string;
  postponed: boolean;
}

interface Blog {
  id: number;
  title: string;
  content: string;
}

interface UserData {
  primary_info: {
    full_name: string;
    image?: string;
    email: string;
  };
  course_info: {
    registered_courses: RegisteredCourse[];
  };
  blogs_saved: Record<string, Blog>;
  project_subscription: boolean;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("learning");
  const [selectedTab, setSelectedTab] = useState("Registered Course");

  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/dashboard/");
        setUserData(response.data);
      } catch (err: unknown) {
        setError("Failed to fetch user data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const realCourses: Course[] =
    userData?.course_info?.registered_courses?.map(
      (course: RegisteredCourse) => ({
        id: course.id, // 👈 this fixes the error
        title: course.course_title,
        imageUrl: "/assets/dashboard/courseimage.png",
        progress: course.status === "Completed" ? 100 : 50,
        status:
          course.status === "Completed"
            ? "Completed Course"
            : course.postponed
            ? "Postponed Course"
            : "Registered Course",
      })
    ) || [];

  const savedBlogs: Blog[] = Object.values(userData?.blogs_saved || {});

  const handleSectionChange = (key: string) => {
    setActiveTab(key);
  };

  const registeredCount = realCourses.filter(
    (c) => c.status === "Registered Course"
  ).length;
  const completedCount = realCourses.filter(
    (c) => c.status === "Completed Course"
  ).length;

  const filteredCourses = realCourses.filter((course) => {
    if (selectedTab === "Registered Course") {
      return course.status === "Registered Course";
    }
    return course.status === selectedTab;
  });

  if (loading) {
    return (
      <ProtectedRoute>
        <DashLayout>
          <div className="w-full flex justify-center items-center min-h-screen">
            <p className="text-lg font-semibold">Loading...</p>
          </div>
        </DashLayout>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute>
        <DashLayout>
          <div className="w-full flex justify-center items-center min-h-screen">
            <p className="text-lg text-red-500">{error}</p>
          </div>
        </DashLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <DashLayout>
        <div className="bg-[#FEFEFD] pb-6">
          <Container>
            <div className="bg-[#FEFEFD] max-w-full md:max-w-[1200px] w-full mx-auto gap-8 px-4 py-6 space-y-6">
              <NavigateArrow
                icon={<BsArrowLeft size={16} />}
                label={<span className="text-sm font-medium">Back</span>}
              />
              <Breadcrumb previousStep="Home" currentStep="Dashboard" />
            </div>

            <div className="w-full flex flex-col gap-6">
              <div className="p-4">
                <ProfileBanner
                  fullName={userData?.primary_info?.full_name ?? "Unknown"}
                  email={userData?.primary_info?.email ?? "Unknown"}
                  avatarUrl={
                    userData?.primary_info?.image
                      ? `${environment.imageUrl}${userData.primary_info.image}`
                      : "/assets/dashboard/icon.png"
                  }
                />
              </div>

              <div className="p-2">
                <TabNavigation
                  tabs={[
                    { label: "Learning", key: "learning" },
                    { label: "Subscription", key: "subscription" },
                    { label: "Saved Blog Posts", key: "saved" },
                    // { label: "Projects", key: "projects" },
                  ]}
                  onTabChange={handleSectionChange}
                />
              </div>

              <div className="p-6 mb-4">
                {activeTab === "learning" && (
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
                          <PrimaryButton
                            text="Browse Course"
                            href="/learning"
                          />
                        </div>
                      )}
                    </div>
                  </>
                )}

                {activeTab === "subscription" && (
                  <>
                    <SectionHeader
                      icon={<MdOutlineAssignment size={45} color="black" />}
                      title="Subscription"
                      className="mb-12"
                    />
                    <div className="bg-[#FBFAF9] flex flex-col py-[60px] px-[24px] items-center justify-center space-y-4">
                      <EmptyPlaceholder
                        title="Get full access to Nubyira project reports and reference files"
                        description="Subscription Status"
                        badgeText={userData?.project_subscription ? "Active" : "Inactive"}
                      />
                      <PrimaryButton
                        text={userData?.project_subscription ? "Contact Us Now" : "Subscribe Now"}
                        href={userData?.project_subscription ? "/contact" : "/dashboard/subscription"}
                        variant="brown"
                      />
                    </div>
                  </>
                )}


                {activeTab === "saved" && (
                  <>
                    <SectionHeader title="Saved Blog Posts" className="mb-12" />
                    {savedBlogs.length === 0 ? (
                      <div className="bg-[#FBFAF9] flex flex-col py-[60px] px-[24px] items-center justify-center space-y-4">
                        <EmptyPlaceholder
                          title="No Saved blog posts yet"
                          description="Click to see blogs"
                        />
                        <PrimaryButton text="View Blogs" href="/blogs" />
                      </div>
                    ) : (
                      <div className="grid gap-4">
                        {savedBlogs.map((blog) => (
                          <div
                            key={blog.id}
                            className="bg-white p-4 rounded-lg shadow-md border border-gray-100"
                          >
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                              {blog.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4">
                              {getExcerpt(blog.content, 30)}
                            </p>
                            <a
                              href={`/blogs/${blog.id}`}
                              className="text-blue-600 text-sm font-medium hover:underline"
                            >
                              Read More →
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* {activeTab === "projects" && (
                  <>
                    <SectionHeader
                      icon={<MdOutlineAssignment size={45} color="black" />}
                      title="Premium Subscription"
                      className="mb-12"
                    />
                    <div className="bg-[#FBFAF9] flex flex-col py-[60px] px-[24px] items-center justify-center space-y-4">
                      <EmptyPlaceholder
                        title="Get full access to Nubyira project reports and reference files"
                        description="Subscription Status"
                        badgeText="Inactive"
                      />
                      <PrimaryButton
                        text="Subscribe Now"
                        href="/dashboard/subscribe"
                        variant="brown"
                      />
                    </div>
                  </>
                )} */}
              </div>
            </div>
          </Container>
        </div>
      </DashLayout>
    </ProtectedRoute>
  );
}

function getExcerpt(html: string, wordLimit: number = 20): string {
  const text = html.replace(/<[^>]+>/g, "");
  return text.split(" ").slice(0, wordLimit).join(" ") + "...";
}
