import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { environment } from "../../env/env.local";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  try {
    const { data } = await axios.post(
      environment.baseUrl + environment?.loginUrl,
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );

    const { token, first_name, middle_name, last_name, image } = data?.success;

    // Set token in HttpOnly cookie
    const response = NextResponse.json({
      message: "Login successful",
      first_name,
      middle_name,
      last_name,
      image,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 3, // 3 days
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Invalid password or username" },
      { status: 401 }
    );
  }
}
