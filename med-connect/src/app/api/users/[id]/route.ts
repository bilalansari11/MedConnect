import { NextResponse } from "next/server";
import { updateUserRole, UserRole } from "../../../../../services/authService";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { role } = body;

    const validRoles: UserRole[] = ["ADMIN", "DOCTOR", "RECEPTIONIST", "PATIENT"];
    
    if (!role || !validRoles.includes(role)) {
      return NextResponse.json(
        { errorMessage: "Invalid role. Must be one of: ADMIN, DOCTOR, RECEPTIONIST, PATIENT" },
        { status: 400 }
      );
    }

    const success = updateUserRole(id, role);

    if (!success) {
      return NextResponse.json(
        { errorMessage: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "User role updated successfully" },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { errorMessage: e.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
