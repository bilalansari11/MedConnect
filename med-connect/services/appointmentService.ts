import fs from "fs";
import path from "path";

export type AppointmentStatus = "pending" | "confirmed" | "rejected" | "completed" | "cancelled";

export interface Appointment {
  id: number;
  patientId: number;
  patientName: string;
  patientEmail: string;
  doctorId: number;
  doctorName: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  reason?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

const appointmentsFilePath = path.join(process.cwd(), "src", "data", "appointments.json");

function getAppointmentsFromFile(): Appointment[] {
  try {
    const data = fs.readFileSync(appointmentsFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function saveAppointmentsToFile(appointments: Appointment[]): void {
  fs.writeFileSync(appointmentsFilePath, JSON.stringify(appointments, null, 2));
}

export function getAllAppointments(): Appointment[] {
  return getAppointmentsFromFile();
}

export function getAppointmentsByPatient(patientId: number): Appointment[] {
  const appointments = getAppointmentsFromFile();
  return appointments.filter((apt) => apt.patientId === patientId);
}

export function getAppointmentsByDoctor(doctorId: number): Appointment[] {
  const appointments = getAppointmentsFromFile();
  return appointments.filter((apt) => apt.doctorId === doctorId);
}

export function getPendingAppointments(): Appointment[] {
  const appointments = getAppointmentsFromFile();
  return appointments.filter((apt) => apt.status === "pending");
}

export function createAppointment(
  patientId: number,
  patientName: string,
  patientEmail: string,
  doctorId: number,
  doctorName: string,
  date: string,
  time: string,
  reason?: string
): Appointment {
  const appointments = getAppointmentsFromFile();
  
  const newAppointment: Appointment = {
    id: appointments.length + 1,
    patientId,
    patientName,
    patientEmail,
    doctorId,
    doctorName,
    date,
    time,
    status: "pending",
    reason,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  appointments.push(newAppointment);
  saveAppointmentsToFile(appointments);
  
  return newAppointment;
}

export function updateAppointmentStatus(
  appointmentId: number,
  newStatus: AppointmentStatus
): Appointment | null {
  const appointments = getAppointmentsFromFile();
  const index = appointments.findIndex((apt) => apt.id === appointmentId);

  if (index === -1) {
    return null;
  }

  appointments[index].status = newStatus;
  appointments[index].updatedAt = new Date().toISOString();
  
  saveAppointmentsToFile(appointments);
  
  return appointments[index];
}

export function getAppointmentById(id: number): Appointment | undefined {
  const appointments = getAppointmentsFromFile();
  return appointments.find((apt) => apt.id === id);
}
