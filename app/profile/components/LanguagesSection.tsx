"use client";

import { Form, Select } from "antd";

interface LanguagesSectionProps {
  isEditing: boolean;
}

export default function LanguagesSection({
  isEditing,
}: LanguagesSectionProps) {
  return (
    <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
        Languages
      </h2>
      <Form.Item
        label="Languages Spoken"
        name="languages"
        help="List all languages you can communicate with patients in"
      >
        <Select
          mode="multiple"
          size="large"
          disabled={!isEditing}
          placeholder="Select languages"
          className="h-14"
          options={[
            { value: "english", label: "English" },
            { value: "spanish", label: "Spanish" },
            { value: "french", label: "French" },
            { value: "german", label: "German" },
            { value: "italian", label: "Italian" },
            { value: "portuguese", label: "Portuguese" },
            { value: "chinese", label: "Chinese" },
            { value: "japanese", label: "Japanese" },
            { value: "korean", label: "Korean" },
            { value: "arabic", label: "Arabic" },
            { value: "hindi", label: "Hindi" },
            { value: "bengali", label: "Bengali" },
          ]}
        />
      </Form.Item>
    </div>
  );
}

