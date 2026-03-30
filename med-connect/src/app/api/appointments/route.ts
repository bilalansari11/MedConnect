import { NextResponse } from "next/server";
import { getAllAppointments, createAppointment, getPendingAppointments, Appointment } from "../../../../services/appointmentService";
import { getAllDoctors, getById, UserData } from "../../../../services/authService";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const userId = searchParams.get("userId");
    const userRole = searchParams.get("role");

    let appointments: Appointment[];

    if (type === "pending") {
      appointments = getPendingAppointments();
    } else if (type === "doctors") {
      // Return list of doctors for appointment booking
      const doctors = getAllDoctors();
      return NextResponse.json({ doctors });
    } else if (userId && userRole === "patient") {
      appointments = getAllAppointments().filter(
        (apt) => apt.patientId === parseInt(userId)
      );
    } else if (userId && userRole === "doctor") {
      appointments = getAllAppointments().filter(
        (apt) => apt.doctorId === parseInt(userId)
      );
    } else {
      appointments = getAllAppointments();
    }

    return NextResponse.json({ appointments });
  } catch (e: any) {
    return NextResponse.json(
      { errorMessage: e.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { patientId, patientName, patientEmail, doctorId, doctorName, date, time, reason } = body;

    if (!patientId || !doctorId || !date || !time) {
      return NextResponse.json(
        { errorMessage: "Missing required fields" },
        { status: 400 }
      );
    }

    const appointment = createAppointment(
      patientId,
      patientName,
      patientEmail,
      doctorId,
      doctorName,
      date,
      time,
      reason
    );

    return NextResponse.json(
      { message: "Appointment created successfully", appointment },
      { status: 201 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { errorMessage: e.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
