"use client";

import { Button, Card, Form, Input, Select } from "antd";

interface WorkingHoursSectionProps {
  isEditing: boolean;
}

export default function WorkingHoursSection({
  isEditing,
}: WorkingHoursSectionProps) {
  return (
    <Card
      title={
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          Working Hours
        </h2>
      }
      className="shadow-md"
    >
      <Form.List name="workingHours">
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
                        Day #{name + 1}
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <Form.Item
                      {...restField}
                      name={[name, "day"]}
                      label="Day"
                      rules={[
                        {
                          required: true,
                          message: "Day is required",
                        },
                      ]}
                    >
                      <Select
                        size="large"
                        disabled={!isEditing}
                        placeholder="Select day"
                        className="h-14"
                        options={[
                          { value: "Monday", label: "Monday" },
                          { value: "Tuesday", label: "Tuesday" },
                          { value: "Wednesday", label: "Wednesday" },
                          { value: "Thursday", label: "Thursday" },
                          { value: "Friday", label: "Friday" },
                          { value: "Saturday", label: "Saturday" },
                          { value: "Sunday", label: "Sunday" },
                        ]}
                      />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "slots"]}
                      label="Time Slots"
                      rules={[
                        {
                          required: true,
                          message: "At least one time slot is required",
                        },
                      ]}
                    >
                      <Form.List name={[name, "slots"]}>
                        {(slotFields, { add: addSlot, remove: removeSlot }) => (
                          <>
                            <div className="space-y-4">
                              {slotFields.map(({ key: slotKey, name: slotName, ...slotRestField }) => (
                                <div key={slotKey} className="flex gap-2 items-end">
                                  <Form.Item
                                    {...slotRestField}
                                    name={[slotName, "startTime"]}
                                    label="Start Time"
                                    className="flex-1"
                                  >
                                    <Input
                                      size="large"
                                      disabled={!isEditing}
                                      placeholder="09:00"
                                      className="h-14"
                                    />
                                  </Form.Item>
                                  <Form.Item
                                    {...slotRestField}
                                    name={[slotName, "endTime"]}
                                    label="End Time"
                                    className="flex-1"
                                  >
                                    <Input
                                      size="large"
                                      disabled={!isEditing}
                                      placeholder="17:00"
                                      className="h-14"
                                    />
                                  </Form.Item>
                                  {isEditing && (
                                    <Button
                                      type="text"
                                      danger
                                      onClick={() => removeSlot(slotName)}
                                      className="cursor-pointer mb-0"
                                    >
                                      Remove
                                    </Button>
                                  )}
                                </div>
                              ))}
                            </div>
                            {isEditing && (
                              <Button
                                type="dashed"
                                onClick={() => addSlot()}
                                block
                                size="large"
                                className="mt-2 h-12"
                              >
                                Add Time Slot
                              </Button>
                            )}
                          </>
                        )}
                      </Form.List>
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
                  Add Working Day
                </span>
              </Button>
            )}
          </>
        )}
      </Form.List>
    </Card>
  );
}

