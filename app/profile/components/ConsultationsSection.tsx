"use client";

import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  TimePicker,
} from "antd";

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
  return (
    <Card
      title={
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          Consultations
        </h2>
      }
      className="mb-6"
    >
      <Form.List name="consultations">
        {(fields, { add, remove }) => (
          <>
            <div className="space-y-6">
              {fields.map(({ key, name, ...restField }) => (
                <Card
                  key={key}
                  extra={
                    isEditing && (
                      <Button
                        type="text"
                        danger
                        icon={<MinusCircleOutlined />}
                        onClick={() => remove(name)}
                        className="cursor-pointer"
                      >
                        Remove
                      </Button>
                    )
                  }
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <Form.Item
                      {...restField}
                      name={[name, "weekDay"]}
                      label="Week Day"
                      rules={[
                        { required: true, message: "Please select week day" },
                      ]}
                    >
                      <Select
                        size="large"
                        placeholder="Select week day"
                        disabled={!isEditing}
                      >
                        {weekDays.map((day) => (
                          <Select.Option key={day} value={day}>
                            {day}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "hospital"]}
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
                      {...restField}
                      name={[name, "location"]}
                      label="Location"
                      className="sm:col-span-2"
                      rules={[
                        { required: true, message: "Please enter location" },
                      ]}
                    >
                      <Input
                        size="large"
                        placeholder="Enter location"
                        disabled={!isEditing}
                      />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "consultationFee"]}
                      label="Consultation Fee"
                      rules={[
                        {
                          required: true,
                          message: "Please enter consultation fee",
                        },
                      ]}
                    >
                      <InputNumber
                        size="large"
                        placeholder="Enter fee"
                        min={0}
                        className="w-full"
                        disabled={!isEditing}
                        formatter={(value) =>
                          `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                      />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "active"]}
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
                      {...restField}
                      name={[name, "timeSlots"]}
                      label="Time Slots"
                      className="sm:col-span-2"
                      rules={[
                        {
                          required: true,
                          message: "Please add at least one time slot",
                        },
                      ]}
                    >
                      <Form.List name={[name, "timeSlots"]}>
                        {(timeFields, { add: addTime, remove: removeTime }) => (
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
                                      name={[timeName, "startTime"]}
                                      label="Start Time"
                                      rules={[
                                        {
                                          required: true,
                                          message: "Please select start time",
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
                                      name={[timeName, "endTime"]}
                                      label="End Time"
                                      rules={[
                                        {
                                          required: true,
                                          message: "Please select end time",
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
                                      icon={<MinusCircleOutlined />}
                                      onClick={() => removeTime(timeName)}
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
                </Card>
              ))}
            </div>
            {isEditing && (
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
                size="large"
                className="mt-6 h-14 border-2 border-dashed border-blue-300 text-blue-600 hover:border-blue-500 hover:text-blue-700 cursor-pointer"
              >
                <span className="flex items-center justify-center gap-2">
                  Add Consultation
                </span>
              </Button>
            )}
          </>
        )}
      </Form.List>
    </Card>
  );
}
