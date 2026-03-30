"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components";

interface Appointment {
  id: number;
  patientId: number;
  patientName: string;
  patientEmail: string;
  doctorId: number;
  doctorName: string;
  date: string;
  time: string;
  status: string;
  reason?: string;
  notes?: string;
}

interface DoctorDashboardProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    role?: string;
  };
}

const statusColors: Record<string, { bg: string; text: string; icon: string }> = {
  pending: { bg: "bg-amber-100", text: "text-amber-700", icon: "⏳" },
  confirmed: { bg: "bg-blue-100", text: "text-blue-700", icon: "✓" },
  completed: { bg: "bg-blue-100", text: "text-blue-700", icon: "✓✓" },
  cancelled: { bg: "bg-red-100", text: "text-red-700", icon: "✗" },
  rejected: { bg: "bg-slate-100", text: "text-slate-700", icon: "✗" },
};

export function DoctorDashboard({ user }: DoctorDashboardProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed" | "all">("upcoming");
  const [stats, setStats] = useState({
    today: 0,
    upcoming: 0,
    completed: 0,
    total: 0,
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await fetch(`/api/appointments?userId=${user.id}&role=doctor`);
      const data = await res.json();
      if (data.appointments) {
        setAppointments(data.appointments);
        
        const today = new Date().toISOString().split("T")[0];
        setStats({
          today: data.appointments.filter((apt: Appointment) => apt.date === today).length,
          upcoming: data.appointments.filter((apt: Appointment) => apt.date >= today && apt.status === "confirmed").length,
          completed: data.appointments.filter((apt: Appointment) => apt.status === "completed").length,
          total: data.appointments.length,
        });
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAppointments = appointments.filter((apt) => {
    if (activeTab === "upcoming") {
      return apt.status === "confirmed" || apt.status === "pending";
    }
    if (activeTab === "completed") {
      return apt.status === "completed";
    }
    return true;
  });

  const getStatusBadge = (status: string) => {
    const colors = statusColors[status] || statusColors.pending;
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text}`}>
        <span className="mr-1">{colors.icon}</span>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section - Teal/Cyan Theme */}
      <div className="bg-gradient-to-r from-teal-500 via-cyan-600 to-blue-600 rounded-3xl p-8 text-white shadow-xl shadow-teal-500/20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Good day, Dr. {user.name}!
            </h2>
            <p className="text-teal-100 text-lg">
              Manage your appointments and patient schedule
            </p>
          </div>
          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-teal-100">Access Level</p>
              <p className="font-bold">Doctor</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid - Teal Theme */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-teal-500 to-teal-600 text-white border-0 shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30 transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-teal-100 text-sm font-medium">Today</p>
              <p className="text-4xl font-bold mt-1">{stats.today}</p>
            </div>
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-cyan-500 to-cyan-600 text-white border-0 shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-cyan-100 text-sm font-medium">Upcoming</p>
              <p className="text-4xl font-bold mt-1">{stats.upcoming}</p>
            </div>
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Completed</p>
              <p className="text-4xl font-bold mt-1">{stats.completed}</p>
            </div>
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </Card>
      </div>

      {/* Appointments Section */}
      <Card className="overflow-hidden shadow-lg border-0">
        <div className="bg-gradient-to-r from-teal-600 to-cyan-700 px-6 py-4 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold">Your Appointments</h3>
                <p className="text-teal-100 text-sm">View and manage patient appointments</p>
              </div>
            </div>
            <div className="flex space-x-2">
              {["upcoming", "completed", "all"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab
                      ? "bg-white text-teal-700 shadow-lg"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-slate-500">Loading appointments...</p>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">No appointments found</h3>
            <p className="text-slate-500">You don't have any {activeTab === "all" ? "" : activeTab} appointments.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredAppointments.map((apt) => (
              <div key={apt.id} className="p-6 hover:bg-slate-50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-teal-500/30">
                      {apt.patientName?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-lg">{apt.patientName}</p>
                      <p className="text-slate-500 text-sm">{apt.patientEmail}</p>
                      {apt.reason && (
                        <p className="text-slate-600 text-sm mt-1">
                          <span className="font-medium">Reason:</span> {apt.reason}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col md:items-end space-y-2">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2 bg-slate-100 rounded-lg px-3 py-1.5">
                        <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-medium text-slate-700">{apt.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-slate-100 rounded-lg px-3 py-1.5">
                        <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-medium text-slate-700">{apt.time}</span>
                      </div>
                    </div>
                    {getStatusBadge(apt.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
