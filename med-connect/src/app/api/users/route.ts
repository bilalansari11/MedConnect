import { NextResponse } from "next/server";
import { getAllUsers, updateUserRole, UserData, UserRole } from "../../../../services/authService";

export async function GET() {
  try {
    const users = getAllUsers();
    // Remove password from response
    const safeUsers = users.map(({ password, ...user }: UserData) => user);
    return NextResponse.json({ users: safeUsers });
  } catch (e: any) {
    return NextResponse.json(
      { errorMessage: e.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
