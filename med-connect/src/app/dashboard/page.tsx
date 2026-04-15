"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DashboardHeader, AdminDashboard, DoctorDashboard, PatientDashboard } from "@/components";
import { CustomCursor } from "@/components/CustomCursor";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const user = session.user as {
    id: string;
    name?: string | null;
    email?: string | null;
    role?: string;
  };

  const renderDashboard = () => {
    const userRole = user.role?.toUpperCase();
    
    switch (userRole) {
      case "ADMIN":
        return <AdminDashboard user={user} />;
      case "DOCTOR":
        return <DoctorDashboard user={user} />;
      case "PATIENT":
      default:
        return <PatientDashboard user={user} />;
    }
  };

  const isStitchAdmin = user.role?.toUpperCase() === "ADMIN";

  if (isStitchAdmin) {
    return (
      <>
        <CustomCursor />
        {renderDashboard()}
      </>
    );
  }

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <DashboardHeader
          userName={user.name || "User"}
          userRole={user.role || "Patient"}
        />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderDashboard()}
        </main>
      </div>
    </>
  );
}
