"use client";

import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Tabs,
  TimePicker,
} from "antd";
import { useEffect, useState } from "react";

interface ConsultationsSectionProps {
  isEditing: boolean;
}

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function ConsultationsSection({
  isEditing,
}: ConsultationsSectionProps) {
  const [activeTab, setActiveTab] = useState("0");
  const form = Form.useFormInstance();

  // Initialize all weekdays if they don't exist
  useEffect(() => {
    const consultations = form.getFieldValue("consultations") || [];
    const existingWeekDays = (consultations as Array<{ weekDay?: string }>).map(
      (c) => c?.weekDay
    );
    const missingWeekDays = weekDays.filter(
      (day) => !existingWeekDays.includes(day)
    );

    if (missingWeekDays.length > 0) {
      const currentConsultations = form.getFieldValue("consultations") || [];
      const newConsultations = [
        ...(currentConsultations as Array<{
          weekDay: string;
          entries: Array<{
            hospital: string;
            location: string;
            consultationFee: number;
            active?: boolean;
            timeSlots: Array<{ startTime: string; endTime: string }>;
          }>;
        }>),
        ...missingWeekDays.map((day) => ({
          weekDay: day,
          entries: [],
        })),
      ];
      form.setFieldsValue({ consultations: newConsultations });
    }
  }, [form]);

  return (
    <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
        Consultations
      </h2>
      <Form.List name="consultations">
        {(weekDayFields, { add: addWeekDay }) => {
          // Ensure we have all weekdays in the correct order
          const consultations = form.getFieldValue("consultations") || [];

          // Create a map of weekday to field index
          const weekDayToIndex = new Map<string, number>();
          weekDayFields.forEach((field) => {
            const consultation = (consultations as Array<{ weekDay?: string }>)[
              field.name
            ];
            const weekDay = consultation?.weekDay;
            if (weekDay) {
              weekDayToIndex.set(weekDay, field.name);
            }
          });

          // Add missing weekdays
          weekDays.forEach((day) => {
            if (!weekDayToIndex.has(day)) {
              addWeekDay({ weekDay: day, entries: [] });
            }
          });

          return (
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              items={weekDays.map((day, index) => {
                // Find the field for this weekday
                const weekDayFieldIndex = weekDayFields.findIndex((field) => {
                  const consultation = consultations[field.name];
                  return consultation?.weekDay === day;
                });

                const weekDayField =
                  weekDayFieldIndex >= 0
                    ? weekDayFields[weekDayFieldIndex]
                    : weekDayFields[index];

                return {
                  key: String(index),
                  label: day,
                  children: weekDayField ? (
                    <div className="mt-6">
                      <Form.Item
                        name={[weekDayField.name, "weekDay"]}
                        hidden
                        initialValue={day}
                      >
                        <Input type="hidden" />
                      </Form.Item>

                      <Form.Item
                        name={[weekDayField.name, "status"]}
                        label="Status"
                        className="mb-8"
                      >
                        <Select
                          size="large"
                          placeholder="Select status"
                          disabled={!isEditing}
                          options={[
                            { label: "Available", value: "available" },
                            { label: "Unavailable", value: "unavailable" },
                            { label: "Limited", value: "limited" },
                          ]}
                        />
                      </Form.Item>

                      <Form.List name={[weekDayField.name, "entries"]}>
                        {(
                          entryFields,
                          { add: addEntry, remove: removeEntry }
                        ) => (
                          <div className="space-y-6 mt-2">
                            {entryFields.map(
                              ({
                                key: entryKey,
                                name: entryName,
                                ...entryRestField
                              }) => (
                                <div
                                  key={entryKey}
                                  className="border border-gray-300 rounded-lg p-6 bg-white"
                                >
                                  <div className="flex items-center justify-between mb-6">
                                    <span className="text-sm font-semibold text-gray-700">
                                      Entry #{entryName + 1}
                                    </span>
                                    {isEditing && (
                                      <Button
                                        type="text"
                                        danger
                                        icon={<MinusCircleOutlined />}
                                        onClick={() => removeEntry(entryName)}
                                        className="cursor-pointer"
                                      >
                                        Remove
                                      </Button>
                                    )}
                                  </div>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    <Form.Item
                                      {...entryRestField}
                                      name={[entryName, "hospital"]}
                                      label="Hospital"
                                      rules={[
                                        {
                                          required: true,
                                          message: "Please enter hospital name",
                                        },
                                      ]}
                                    >
                                      <Input
                                        size="large"
                                        placeholder="Enter hospital name"
                                        disabled={!isEditing}
                                      />
                                    </Form.Item>

                                    <Form.Item
                                      {...entryRestField}
                                      name={[entryName, "consultationFee"]}
                                      label="Consultation Fee"
                                      rules={[
                                        {
                                          required: true,
                                          message:
                                            "Please enter consultation fee",
                                        },
                                      ]}
                                    >
                                      <InputNumber
                                        size="large"
                                        placeholder="Enter fee"
                                        min={0}
                                        className="w-full"
                                        style={{ width: "100%" }}
                                        disabled={!isEditing}
                                        formatter={(value) =>
                                          `$ ${value}`.replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ","
                                          )
                                        }
                                      />
                                    </Form.Item>

                                    <Form.Item
                                      {...entryRestField}
                                      name={[entryName, "location"]}
                                      label="Location"
                                      className="sm:col-span-2"
                                      rules={[
                                        {
                                          required: true,
                                          message: "Please enter location",
                                        },
                                      ]}
                                    >
                                      <Input
                                        size="large"
                                        placeholder="Enter location"
                                        disabled={!isEditing}
                                      />
                                    </Form.Item>

                                    <Form.Item
                                      {...entryRestField}
                                      name={[entryName, "active"]}
                                      label="Active Status"
                                      valuePropName="checked"
                                      initialValue={true}
                                      className="flex items-center"
                                    >
                                      <div className="h-14 flex items-center">
                                        <Switch disabled={!isEditing} />
                                      </div>
                                    </Form.Item>

                                    <Form.Item
                                      {...entryRestField}
                                      name={[entryName, "timeSlots"]}
                                      label="Time Slots"
                                      className="sm:col-span-2"
                                      rules={[
                                        {
                                          required: true,
                                          message:
                                            "Please add at least one time slot",
                                        },
                                      ]}
                                    >
                                      <Form.List
                                        name={[entryName, "timeSlots"]}
                                      >
                                        {(
                                          timeFields,
                                          { add: addTime, remove: removeTime }
                                        ) => (
                                          <div className="flex flex-col gap-y-6">
                                            {timeFields.map(
                                              ({
                                                key: timeKey,
                                                name: timeName,
                                                ...timeRestField
                                              }) => (
                                                <div
                                                  key={timeKey}
                                                  className="flex items-start gap-4"
                                                >
                                                  <div className="flex-1 grid grid-cols-2 gap-4">
                                                    <Form.Item
                                                      {...timeRestField}
                                                      name={[
                                                        timeName,
                                                        "startTime",
                                                      ]}
                                                      label="Start Time"
                                                      rules={[
                                                        {
                                                          required: true,
                                                          message:
                                                            "Please select start time",
                                                        },
                                                      ]}
                                                      className="mb-0"
                                                    >
                                                      <TimePicker
                                                        size="large"
                                                        format="hh:mm A"
                                                        className="w-full"
                                                        disabled={!isEditing}
                                                        placeholder="Start time"
                                                      />
                                                    </Form.Item>
                                                    <Form.Item
                                                      {...timeRestField}
                                                      name={[
                                                        timeName,
                                                        "endTime",
                                                      ]}
                                                      label="End Time"
                                                      rules={[
                                                        {
                                                          required: true,
                                                          message:
                                                            "Please select end time",
                                                        },
                                                      ]}
                                                      className="mb-0"
                                                    >
                                                      <TimePicker
                                                        size="large"
                                                        format="hh:mm A"
                                                        className="w-full"
                                                        disabled={!isEditing}
                                                        placeholder="End time"
                                                      />
                                                    </Form.Item>
                                                  </div>
                                                  {isEditing && (
                                                    <Button
                                                      type="text"
                                                      danger
                                                      icon={
                                                        <MinusCircleOutlined />
                                                      }
                                                      onClick={() =>
                                                        removeTime(timeName)
                                                      }
                                                      className="cursor-pointer mt-8"
                                                    >
                                                      Remove
                                                    </Button>
                                                  )}
                                                </div>
                                              )
                                            )}
                                            {isEditing && (
                                              <Button
                                                type="dashed"
                                                onClick={() => addTime()}
                                                block
                                                icon={<PlusOutlined />}
                                                size="large"
                                                className="cursor-pointer h-14"
                                              >
                                                Add Time Slot
                                              </Button>
                                            )}
                                          </div>
                                        )}
                                      </Form.List>
                                    </Form.Item>
                                  </div>
                                </div>
                              )
                            )}
                            {isEditing && (
                              <Button
                                type="dashed"
                                onClick={() => addEntry()}
                                block
                                icon={<PlusOutlined />}
                                size="large"
                                className="cursor-pointer h-14"
                              >
                                Add Entry
                              </Button>
                            )}
                          </div>
                        )}
                      </Form.List>
                    </div>
                  ) : (
                    <div className="mt-6 text-gray-500">Loading...</div>
                  ),
                };
              })}
            />
          );
        }}
      </Form.List>
    </div>
  );
}
