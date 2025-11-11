"use client";

import { Button, Card, Form, Input, Select } from "antd";

const { TextArea } = Input;

interface SpecialtiesSectionProps {
  isEditing: boolean;
}

export default function SpecialtiesSection({
  isEditing,
}: SpecialtiesSectionProps) {
  return (
    <Card
      title={
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          Specialties & Expertise
        </h2>
      }
      className="shadow-md"
    >
      <Form.List name="specialties">
        {(fields, { add, remove }) => (
          <>
            <div className="space-y-6">
              {fields.map(({ key, name, ...restField }) => (
                <Card
                  key={key}
                  className="border-2 border-gray-200"
                  title={
                    <div className="flex items-center justify-between">
                      <span className="text-base font-semibold text-gray-900">
                        Specialty #{name + 1}
                      </span>
                      {isEditing && (
                        <Button
                          type="text"
                          danger
                          onClick={() => remove(name)}
                          className="cursor-pointer"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  }
                >
                  <div className="space-y-4 sm:space-y-6">
                    <Form.Item
                      {...restField}
                      name={[name, "name"]}
                      label="Specialty Name"
                      rules={[
                        {
                          required: true,
                          message: "Specialty name is required",
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        disabled={!isEditing}
                        placeholder="e.g., Cardiology"
                        className="h-14"
                      />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "description"]}
                      label="Description"
                      rules={[
                        {
                          required: true,
                          message: "Description is required",
                        },
                      ]}
                    >
                      <TextArea
                        rows={3}
                        disabled={!isEditing}
                        placeholder="Describe this specialty and your expertise..."
                        className="resize-none"
                      />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "certifications"]}
                      label="Certifications"
                    >
                      <Select
                        mode="tags"
                        size="large"
                        disabled={!isEditing}
                        placeholder="Add certifications (press Enter to add)"
                        className="h-14"
                      />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "procedures"]}
                      label="Procedures & Services"
                    >
                      <Select
                        mode="tags"
                        size="large"
                        disabled={!isEditing}
                        placeholder="Add procedures (press Enter to add)"
                        className="h-14"
                      />
                    </Form.Item>
                  </div>
                </Card>
              ))}
            </div>

            {isEditing && (
              <Button
                type="dashed"
                onClick={() => add()}
                block
                size="large"
                className="mt-6 h-14 border-2 border-dashed border-blue-300 text-blue-600 hover:border-blue-500 hover:text-blue-700 cursor-pointer"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add Specialty
                </span>
              </Button>
            )}
          </>
        )}
      </Form.List>
    </Card>
  );
}

