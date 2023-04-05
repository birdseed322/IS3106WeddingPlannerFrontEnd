import React from "react";
import {
  DayPilotNavigator,
  DayPilotCalendar,
} from "@daypilot/daypilot-lite-react";
import { Card } from "primereact/card";
import VendorNavbar from "../VendorNavbar/VendorNavbar";

function Schedule() {
  const [startDate, setStartDate] = React.useState(new Date());
  const [selectedReq, setSelectedReq] = React.useState({});
  const events = [
    {
      id: 1,
      text: "Daniel and chapati",
      start: "2023-03-25T10:00:00",
      end: "2023-03-25T13:40:00",
      url: "www.thiswillbringyousomewhereelse.com",
      description: "Something about the wedding and stuff",
    },
    {
      id: 2,
      text: "Daniel and Someone else",
      start: "2023-03-25T11:00:00",
      end: "2023-03-25T16:40:00",
      url: "www.thiswillbringyousomewhereelse.com",
      description: "Something about the wedding and stuff",
    },
    {
      id: 3,
      text: "Daniel and chapati",
      start: "2023-03-25T11:20:00",
      end: "2023-03-25T13:40:00",
      url: "www.thiswillbringyousomewhereelse.com",
      description: "Something about the wedding and stuff",
    },
    {
      id: 4,
      text: "Daniel and Someone else",
      start: "2023-03-25T15:00:00",
      end: "2023-03-25T19:40:00",
      url: "www.thiswillbringyousomewhereelse.com",
      description: "Something about the wedding and stuff",
    },
  ];

  return (
    <div>
      <VendorNavbar/>
      <div className="grid justify-content-center gap-5 h-min">
        <div className="col-5 py-8 grid w-min">
          <div className="px-8 my-6 col-12 w-min">
            <DayPilotNavigator
              onTimeRangeSelected={(args) => {
                console.log("You clicked: " + args.day);
                setStartDate(args.day);
              }}
              selectMode="week"
            />
          </div>
          <Card
            className="col-12"
            title={
              !Object.keys(selectedReq).includes("text")
                ? null
                : selectedReq.text
            }
          >
            {!Object.keys(selectedReq).includes("description") ? (
              <h1>No request selected</h1>
            ) : (
              selectedReq.description
            )}
          </Card>
        </div>
        <div className="col-7 my-auto">
          <DayPilotCalendar
            viewType="Week"
            startDate={startDate}
            events={events}
            onEventClick={(args) => {
              console.log(args.e.data.url);
              //Onclick maybe will open request pop up to view summary. With choice to enter to request page.
              setSelectedReq(args.e.data);
            }}
            eventMoveHandling="Disabled"
          />
        </div>
      </div>
    </div>
  );
}

export default Schedule;
