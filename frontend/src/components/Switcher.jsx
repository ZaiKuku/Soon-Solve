import { useState } from "react";
import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTab } from "../redux/activeTabSlice";

export default function Switcher() {
  const activeTab = useSelector((state) => state.activeTab.activeTab);
  const dispatch = useDispatch();

  const data = [
    {
      label: "Released",
      value: "Released",
    },
    {
      label: "Accepted",
      value: "Accepted",
    },
  ];
  return (
    <Tabs value={activeTab} className="z-10 ">
      <TabsHeader
        className="rounded-none border-b border-blue-gray-50 bg-transparent fixed p-0 w-4/5 m-auto left-0 right-0 top-[75px] bg-white h-fit"
        indicatorProps={{
          className:
            "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
        }}
      >
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => dispatch(setActiveTab(value))}
            className={activeTab === value ? "text-gray-900" : ""}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
    </Tabs>
  );
}
