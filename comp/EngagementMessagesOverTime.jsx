"use client"
import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import engagementHelper from "./EngagementHelper";

const EngagementMessagesOverTime = () => {
  const messageCountList = engagementHelper.getMessageCountList();

  const channels = engagementHelper.getChannelsData();

  const options = engagementHelper.engagementMessageOverTimeChartOptions(messageCountList, channels);

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default EngagementMessagesOverTime;
