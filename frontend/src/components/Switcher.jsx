import { useState } from "react";
import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";

export default function Switcher() {
  const [activeTab, setActiveTab] = useState("Accepted");
  const data = [
    {
      label: "Accepted",
      value: "Accepted",
    },
    {
      label: "Released",
      value: "Released",
    },
  ];
  return (
    <Tabs value={activeTab}>
      <TabsHeader
        className="rounded-none border-b border-blue-gray-50 bg-transparent fixed p-0 w-4/5 m-auto left-0 right-0 top-[75px]"
        indicatorProps={{
          className:
            "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
        }}
      >
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => setActiveTab(value)}
            className={activeTab === value ? "text-gray-900" : ""}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
    </Tabs>
  );
}
