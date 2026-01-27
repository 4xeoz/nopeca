"use server";

import prisma from "@/lib/prisma";

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
  error?: string;
}

export async function submitContactForm(
  data: ContactFormData
): Promise<ContactFormResponse> {
  try {
    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return {
        success: false,
        message: "Please fill in all required fields.",
        error: "VALIDATION_ERROR",
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        message: "Please enter a valid email address.",
        error: "INVALID_EMAIL",
      };
    }

    // Create contact in database
    await prisma.contact.create({
      data: {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone?.trim() || null,
        message: data.message.trim(),
      },
    });

    return {
      success: true,
      message: "Thank you for reaching out! We will get back to you soon.",
    };
  } catch (error) {
    console.error("Contact form submission error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
      error: "SERVER_ERROR",
    };
  }
}
