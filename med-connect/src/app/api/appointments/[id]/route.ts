import { NextResponse } from "next/server";
import { updateAppointmentStatus, getAppointmentById, AppointmentStatus } from "../../../../../services/appointmentService";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const idNum = parseInt(id);
    const body = await request.json();
    const { status } = body;

    if (!status || !["pending", "confirmed", "rejected", "completed", "cancelled"].includes(status)) {
      return NextResponse.json(
        { errorMessage: "Invalid status" },
        { status: 400 }
      );
    }

    const appointment = updateAppointmentStatus(idNum, status as AppointmentStatus);

    if (!appointment) {
      return NextResponse.json(
        { errorMessage: "Appointment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Appointment status updated successfully", appointment },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { errorMessage: e.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const idNum = parseInt(id);
    const appointment = getAppointmentById(idNum);

    if (!appointment) {
      return NextResponse.json(
        { errorMessage: "Appointment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ appointment });
  } catch (e: any) {
    return NextResponse.json(
      { errorMessage: e.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
