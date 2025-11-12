"use client";

import { Button, Form, Input } from "antd";

const { TextArea } = Input;

interface EducationSectionProps {
  isEditing: boolean;
}

export default function EducationSection({
  isEditing,
}: EducationSectionProps) {
  return (
    <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
        Education & Qualifications
      </h2>
      <Form.List name="education">
        {(fields, { add, remove }) => (
          <>
            <div className="space-y-6">
              {fields.map(({ key, name, ...restField }) => (
                <div
                  key={key}
                  className="border border-gray-200 rounded-lg p-6 bg-gray-50/50"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-base font-semibold text-gray-900">
                      Education #{name + 1}
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <Form.Item
                      {...restField}
                      name={[name, "institute"]}
                      label="Institute"
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

                    <Form.Item
                      {...restField}
                      name={[name, "degree"]}
                      label="Degree"
                      rules={[
                        {
                          required: true,
                          message: "Degree is required",
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        disabled={!isEditing}
                        placeholder="e.g., MD, MBBS, PhD"
                        className="h-14"
                      />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "passingYear"]}
                      label="Passing Year"
                      rules={[
                        {
                          required: true,
                          message: "Passing year is required",
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        size="large"
                        disabled={!isEditing}
                        placeholder="e.g., 2010"
                        className="h-14"
                      />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "location"]}
                      label="Location"
                      rules={[
                        {
                          required: true,
                          message: "Location is required",
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        disabled={!isEditing}
                        placeholder="e.g., Boston, MA, USA"
                        className="h-14"
                      />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "additionalInfo"]}
                      label="Additional Information"
                      className="sm:col-span-2"
                    >
                      <TextArea
                        rows={3}
                        disabled={!isEditing}
                        placeholder="Any additional details, honors, achievements, etc."
                        className="resize-none"
                      />
                    </Form.Item>
                  </div>
                </div>
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
                  Add Education
                </span>
              </Button>
            )}
          </>
        )}
      </Form.List>

      <Form.Item
        label="Additional Certifications"
        name="certifications"
        className="mt-8"
      >
        <TextArea
          rows={4}
          disabled={!isEditing}
          placeholder="List any additional certifications, board certifications, or special training..."
          className="resize-none"
        />
      </Form.Item>
    </div>
  );
}

