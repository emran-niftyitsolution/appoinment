"use client";

import { useState } from "react";
import { Modal, Form, Input, Select, Button, message } from "antd";

const { TextArea } = Input;

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctorName: string;
  doctorSpecialty: string;
  price: string;
  selectedDate?: string;
  selectedTime?: string;
}

export default function AppointmentModal({
  isOpen,
  onClose,
  doctorName,
  doctorSpecialty,
  price,
  selectedDate = "",
  selectedTime = "",
}: AppointmentModalProps) {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
    message.success("Appointment booked successfully!");

    // Reset form after 2 seconds
    setTimeout(() => {
      setIsSuccess(false);
      form.resetFields();
      onClose();
    }, 2000);
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  const formatDisplayTime = (time: string) => {
    if (!time) return "";
    // Handle slot format "09:00-12:00"
    if (time.includes("-")) {
      const [startTime, endTime] = time.split("-");
      const formatSingleTime = (t: string) => {
        const [hour, minute] = t.split(":");
        const hourNum = parseInt(hour);
        const hour12 = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
        const ampm = hourNum >= 12 ? "PM" : "AM";
        return `${hour12}:${minute} ${ampm}`;
      };
      return `${formatSingleTime(startTime)} - ${formatSingleTime(endTime)}`;
    }
    // Handle single time format (backward compatibility)
    const [hour, minute] = time.split(":");
    const hourNum = parseInt(hour);
    const hour12 = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
    const ampm = hourNum >= 12 ? "PM" : "AM";
    return `${hour12}:${minute} ${ampm}`;
  };

  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Modal
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      centered
      width="90%"
      style={{ maxWidth: 700 }}
      styles={{
        content: {
          padding: 0,
        },
        body: {
          padding: 0,
        },
      }}
    >
      <div className="p-5">
        {/* Header */}
        <div className="mb-3 pb-2 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-700 mb-1">
            Book Appointment
          </h2>
          <p className="text-sm text-gray-600">
            <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
              {doctorName}
            </span>
            {' '}- {doctorSpecialty}
          </p>
        </div>

        {isSuccess ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg
                className="w-7 h-7 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Appointment Booked!
            </h3>
            <p className="text-xs text-gray-600">
              Your appointment has been successfully scheduled. You will receive
              a confirmation email shortly.
            </p>
          </div>
        ) : (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              date: selectedDate,
              time: selectedTime,
            }}
            className="space-y-1"
          >
            {/* Selected Date & Time Display - Compact */}
            {selectedDate && selectedTime && (
              <div className="bg-blue-50 rounded-lg p-2 mb-2 border border-blue-200">
                <p className="text-xs text-gray-600 mb-0.5">Appointment</p>
                <p className="text-sm font-semibold text-gray-900">
                  {formatDisplayDate(selectedDate)}
                </p>
                <p className="text-sm font-semibold text-blue-600">
                  {formatDisplayTime(selectedTime)}
                </p>
              </div>
            )}

            {/* Reason for Visit */}
            <Form.Item
              label={<span className="text-xs font-semibold">Reason for Visit</span>}
              name="reason"
              rules={[
                { required: true, message: "Please select a reason" },
              ]}
              className="mb-1"
            >
              <Select
                placeholder="Select reason"
                size="large"
                options={[
                  { label: "General Consultation", value: "consultation" },
                  { label: "Follow-up Visit", value: "follow-up" },
                  { label: "Routine Checkup", value: "checkup" },
                  { label: "Emergency", value: "emergency" },
                  { label: "Other", value: "other" },
                ]}
                className="rounded-lg"
              />
            </Form.Item>

            {/* Patient Information - Compact Grid */}
            <div className="grid grid-cols-2 gap-2">
              <Form.Item
                label={<span className="text-xs font-semibold">Full Name</span>}
                name="name"
                rules={[
                  { required: true, message: "Required" },
                ]}
                className="mb-1"
              >
                <Input
                  size="large"
                  placeholder="John Doe"
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-xs font-semibold">Email</span>}
                name="email"
                rules={[
                  { required: true, message: "Required" },
                  { type: "email", message: "Invalid email" },
                ]}
                className="mb-1"
              >
                <Input
                  type="email"
                  size="large"
                  placeholder="john@example.com"
                  className="rounded-lg"
                />
              </Form.Item>
            </div>

            <Form.Item
              label={<span className="text-xs font-semibold">Phone Number</span>}
              name="phone"
              rules={[
                { required: true, message: "Required" },
              ]}
              className="mb-1"
            >
              <Input
                type="tel"
                size="large"
                placeholder="+1 (555) 123-4567"
                className="rounded-lg"
              />
            </Form.Item>

            {/* Additional Notes - Compact */}
            <Form.Item 
              label={<span className="text-xs font-semibold">Notes (Optional)</span>} 
              name="notes"
              className="mb-1"
            >
              <TextArea
                rows={2}
                placeholder="Additional information..."
                className="rounded-lg"
              />
            </Form.Item>

            {/* Submit Buttons */}
            <div className="flex gap-2 pt-2">
              <Button
                size="large"
                onClick={handleCancel}
                className="flex-1 rounded-lg"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={isSubmitting}
                className="flex-1 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 border-none hover:opacity-90"
              >
                {isSubmitting ? "Booking..." : "Book Appointment"}
              </Button>
            </div>
          </Form>
        )}
      </div>
    </Modal>
  );
}
