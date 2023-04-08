import React from "react";
import {
  DayPilotNavigator,
  DayPilotCalendar,
} from "@daypilot/daypilot-lite-react";
import { Card } from "primereact/card";
import VendorNavbar from "../VendorNavbar/VendorNavbar";
import { Button } from "primereact/button";
import { Link, redirect } from "react-router-dom";
import { Dialog } from "primereact/dialog";

function Schedule() {
  const [startDate, setStartDate] = React.useState(new Date());
  const [selectedReq, setSelectedReq] = React.useState({
    start: "",
    end: "",
    id: "",
  });
  const [calendarVisible, setCalendarVisible] = React.useState(false);
  const [requestVisible, setRequestVisible] = React.useState(false);

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
      <VendorNavbar />
      <>
        <h3
          className="text-center text-2xl m-1 w-2 m-auto cursor-pointer"
          onClick={() => setCalendarVisible(true)}
        >
          {startDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h3>
        <DayPilotCalendar
          viewType="Week"
          startDate={startDate}
          events={events}
          headerDateFormat= "d, dddd"
          onEventClick={(args) => {
            console.log(args.e.data);
            //Onclick maybe will open request pop up to view summary. With choice to enter to request page.
            setSelectedReq(args.e.data);
            setRequestVisible(true);
          }}
          eventMoveHandling="Disabled"
        />
        <Dialog
          visible={calendarVisible}
          style={{ width: "25vw"}}
          onHide={() => setCalendarVisible(false)}
          draggable={false}
          header="Week Selection"
        >
          <div className="m-auto w-min">
            <DayPilotNavigator
              onTimeRangeSelected={(args) => {
                console.log("You clicked: " + args.day);
                setStartDate(new Date(args.day));
              }}
              selectMode="week"
            />
          </div>
        </Dialog>
        <Dialog
          visible={requestVisible}
          style={{ width: "25vw" }}
          header={selectedReq.text}
          onHide={() => setRequestVisible(false)}
          draggable={false}
        >
          <div>
            <p>{selectedReq.description}</p>
            <p>
              Date: {new Date(selectedReq.start.value).toLocaleDateString()}
            </p>
            <p>
              Start:{" "}
              {new Date(selectedReq.start.value).toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
            <p>
              End:{" "}
              {new Date(selectedReq.end.value).toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div className="flex justify-content-center">
            <Link
              className="no-underline"
              to={"/vendor/request/" + selectedReq.id}
            >
              <Button label="View Request" />
            </Link>
          </div>
        </Dialog>
      </>
    </div>
  );
}

export default Schedule;
