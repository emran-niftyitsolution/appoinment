"use client";

import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const { TextArea } = Input;

export default function ContactPage() {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    message.success("Thank you! Your message has been sent successfully.");
    form.resetFields();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <Header />

      {/* Page Header */}
      <section className="relative pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-8 sm:pb-12 md:pb-16 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-cyan-500/5 to-purple-500/5">
          <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-blue-200/20 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl animate-blob"></div>
          <div className="absolute top-20 sm:top-40 right-4 sm:right-10 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-cyan-200/20 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Get In{" "}
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent animate-gradient">
                Touch
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed">
              Have questions? We&apos;d love to hear from you. Send us a message
              and we&apos;ll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 md:p-12">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
                    Send us a Message
                  </h2>
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    size="large"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <Form.Item
                        label={
                          <span className="text-sm font-semibold">
                            First Name
                          </span>
                        }
                        name="firstName"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your first name",
                          },
                        ]}
                      >
                        <Input placeholder="John" className="rounded-xl" />
                      </Form.Item>
                      <Form.Item
                        label={
                          <span className="text-sm font-semibold">
                            Last Name
                          </span>
                        }
                        name="lastName"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your last name",
                          },
                        ]}
                      >
                        <Input placeholder="Doe" className="rounded-xl" />
                      </Form.Item>
                    </div>

                    <Form.Item
                      label={
                        <span className="text-sm font-semibold">Email</span>
                      }
                      name="email"
                      rules={[
                        { required: true, message: "Please enter your email" },
                        {
                          type: "email",
                          message: "Please enter a valid email",
                        },
                      ]}
                    >
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        className="rounded-xl"
                      />
                    </Form.Item>

                    <Form.Item
                      label={
                        <span className="text-sm font-semibold">Phone</span>
                      }
                      name="phone"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your phone number",
                        },
                      ]}
                    >
                      <Input
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="rounded-xl"
                      />
                    </Form.Item>

                    <Form.Item
                      label={
                        <span className="text-sm font-semibold">Subject</span>
                      }
                      name="subject"
                      rules={[
                        { required: true, message: "Please enter a subject" },
                      ]}
                    >
                      <Input
                        placeholder="How can we help?"
                        className="rounded-xl"
                      />
                    </Form.Item>

                    <Form.Item
                      label={
                        <span className="text-sm font-semibold">Message</span>
                      }
                      name="message"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your message",
                        },
                      ]}
                    >
                      <TextArea
                        rows={6}
                        placeholder="Tell us more about your inquiry..."
                        className="rounded-xl"
                      />
                    </Form.Item>

                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        loading={isSubmitting}
                        className="w-full sm:w-auto px-8 py-6 h-auto rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 border-none hover:opacity-90 text-base font-semibold cursor-pointer"
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    Phone
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    +1 (555) 123-4567
                  </p>
                </div>

                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    Email
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    support@doctorfind.com
                  </p>
                </div>

                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    Address
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    123 Medical Center Dr
                    <br />
                    Health City, HC 12345
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
