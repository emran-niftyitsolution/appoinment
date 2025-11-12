"use client";

import { Card, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";

const { TextArea } = Input;

interface GeneralInfoSectionProps {
  isEditing: boolean;
  isDoctor: boolean;
}

export default function GeneralInfoSection({
  isEditing,
  isDoctor,
}: GeneralInfoSectionProps) {
  return (
    <Card
      title={
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          {isDoctor ? "Personal & Professional Information" : "General Information"}
        </h2>
      }
      className="shadow-md"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "First name is required" }]}
        >
          <Input size="large" disabled={!isEditing} className="h-14" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Last name is required" }]}
        >
          <Input size="large" disabled={!isEditing} className="h-14" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            {
              required: true,
              message: "Phone number is required",
            },
          ]}
        >
          <Input size="large" disabled={!isEditing} className="h-14" />
        </Form.Item>

        <Form.Item
          label="Designation"
          name="designation"
          rules={[
            {
              required: true,
              message: "Designation is required",
            },
          ]}
        >
          <Input
            size="large"
            disabled={!isEditing}
            placeholder="e.g., Dr., MD, PhD, etc."
            className="h-14"
          />
        </Form.Item>

        <Form.Item
          label="Institute"
          name="institute"
          rules={[
            {
              required: true,
              message: "Institute is required",
            },
          ]}
        >
          <Input
            size="large"
            disabled={!isEditing}
            placeholder="e.g., Harvard Medical School"
            className="h-14"
          />
        </Form.Item>

        {isDoctor && (
          <>
            <Form.Item
              label="Main Specialty"
              name="specialty"
              rules={[
                {
                  required: isDoctor,
                  message: "Main specialty is required",
                },
              ]}
            >
              <Select
                size="large"
                disabled={!isEditing}
                placeholder="Select your main specialty"
                className="h-14"
                options={[
                  { value: "cardiology", label: "Cardiology" },
                  { value: "dermatology", label: "Dermatology" },
                  { value: "orthopedics", label: "Orthopedics" },
                  { value: "pediatrics", label: "Pediatrics" },
                  { value: "neurology", label: "Neurology" },
                  { value: "oncology", label: "Oncology" },
                  { value: "psychiatry", label: "Psychiatry" },
                  { value: "surgery", label: "Surgery" },
                  {
                    value: "internal-medicine",
                    label: "Internal Medicine",
                  },
                  {
                    value: "family-medicine",
                    label: "Family Medicine",
                  },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="Other Specialties"
              name="otherSpecialties"
              help="Select additional specialties (optional)"
            >
              <Select
                mode="multiple"
                size="large"
                disabled={!isEditing}
                placeholder="Select other specialties"
                className="h-14"
                options={[
                  { value: "cardiology", label: "Cardiology" },
                  { value: "dermatology", label: "Dermatology" },
                  { value: "orthopedics", label: "Orthopedics" },
                  { value: "pediatrics", label: "Pediatrics" },
                  { value: "neurology", label: "Neurology" },
                  { value: "oncology", label: "Oncology" },
                  { value: "psychiatry", label: "Psychiatry" },
                  { value: "surgery", label: "Surgery" },
                  {
                    value: "internal-medicine",
                    label: "Internal Medicine",
                  },
                  {
                    value: "family-medicine",
                    label: "Family Medicine",
                  },
                ]}
              />
            </Form.Item>
          </>
        )}

        {isDoctor && (
          <>

            <Form.Item
              label="Started Working"
              name="startedWorking"
              help="Select the date when you started your medical practice"
            >
              <DatePicker
                size="large"
                disabled={!isEditing}
                placeholder="Select start date"
                className="h-14 w-full"
                format="YYYY-MM-DD"
                picker="date"
              />
            </Form.Item>

            <Form.Item
              label="Location"
              name="location"
              rules={[
                {
                  required: isDoctor,
                  message: "Location is required",
                },
              ]}
            >
              <Input
                size="large"
                disabled={!isEditing}
                placeholder="e.g., New York, NY"
                className="h-14"
              />
            </Form.Item>

            <Form.Item
              label="Consultation Price"
              name="price"
              rules={[
                {
                  required: isDoctor,
                  message: "Price is required",
                },
              ]}
            >
              <Input
                size="large"
                disabled={!isEditing}
                placeholder="e.g., 150"
                prefix="$"
                className="h-14"
              />
            </Form.Item>

            <Form.Item label="Medical License Number" name="licenseNumber">
              <Input
                size="large"
                disabled={!isEditing}
                placeholder="Enter your medical license number"
                className="h-14"
              />
            </Form.Item>

            <Form.Item
              label="Available"
              name="available"
              valuePropName="checked"
            >
              <Select
                size="large"
                disabled={!isEditing}
                className="h-14"
                options={[
                  { value: true, label: "Available" },
                  { value: false, label: "Not Available" },
                ]}
              />
            </Form.Item>

            <Form.Item label="Bio" name="bio" className="sm:col-span-2">
              <TextArea
                rows={5}
                disabled={!isEditing}
                placeholder="Tell patients about yourself, your approach to care, and what makes you unique..."
                className="resize-none"
              />
            </Form.Item>
          </>
        )}
      </div>
    </Card>
  );
}

