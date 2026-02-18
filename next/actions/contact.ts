"use server";

import prisma from "@/lib/prisma";

export interface ContactFormData {
  name: string;
  phone: string;
  studyField: string;
  country: string;
  email?: string;
  message?: string;
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
    if (!data.name || !data.phone || !data.studyField || !data.country) {
      return {
        success: false,
        message: "Please fill in all required fields.",
        error: "VALIDATION_ERROR",
      };
    }

    // Validate email format if provided
    if (data.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        return {
          success: false,
          message: "Please enter a valid email address.",
          error: "INVALID_EMAIL",
        };
      }
    }

    // Compose a structured message to store field of study and country
    const parts: string[] = [
      `📚 Field of Study: ${data.studyField}`,
      `🌍 Country: ${data.country}`,
    ];
    if (data.message?.trim()) {
      parts.push(`\n💬 Message:\n${data.message.trim()}`);
    }
    const composedMessage = parts.join("\n");

    // Create contact in database
    await prisma.contact.create({
      data: {
        name: data.name.trim(),
        email: data.email?.trim().toLowerCase() ?? null,
        phone: data.phone.trim() || null,
        message: composedMessage,
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
