import React, { useContext } from "react";
import { LoginTokenContext } from "../../../context/LoginTokenContext";
import {
  DayPilotNavigator,
  DayPilotCalendar,
} from "@daypilot/daypilot-lite-react";
import { Card } from "primereact/card";
import VendorNavbar from "../VendorNavbar/VendorNavbar";
import { Button } from "primereact/button";
import { Link, redirect, useSearchParams } from "react-router-dom";
import { Dialog } from "primereact/dialog";

function Schedule() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [startDate, setStartDate] = React.useState(
    searchParams.get("date") ? new Date(searchParams.get("date")) : new Date()
  );
  const [selectedReq, setSelectedReq] = React.useState({
    start: "",
    end: "",
    id: "",
  });
  const [calendarVisible, setCalendarVisible] = React.useState(false);
  const [requestVisible, setRequestVisible] = React.useState(false);
  const [requests, setRequests] = React.useState([]);
  const [token, setToken] = useContext(LoginTokenContext);
  React.useEffect(() => {
    const apiUrl =
      "http://localhost:8080/IS3106WeddingPlanner-war/webresources/requests/vendorRequests/accepted/" +
      token.userId;
    fetch(apiUrl).then((res) => {
      res.json().then((data) => {
        let reformat = [];
        data.forEach((event) => {
          let x = {};
          x.id = event.requestId;
          x.text = event.weddingProject.name;
          const weddingDate = new Date(
            event.weddingProject.weddingDate.slice(0, -5)
          );
          
          if (event.weddingProject.weddingEndTime) {
            const endTime = new Date(
              event.weddingProject.weddingEndTime.slice(0, -5)
            );
            x.end = new Date(
              weddingDate.getFullYear(),
              weddingDate.getMonth(),
              weddingDate.getDate(),
              endTime.getHours() + 8,
              endTime.getMinutes()
            );
          } else {
            x.end = new Date(
              weddingDate.getFullYear(),
              weddingDate.getMonth(),
              weddingDate.getDate(),
              31,
              59
            );
          }
          const startTime = new Date(
            event.weddingProject.weddingStartTime.slice(0, -5)
          );
          x.start = new Date(
            weddingDate.getFullYear(),
            weddingDate.getMonth(),
            weddingDate.getDate(),
            startTime.getHours() + 8,
            startTime.getMinutes()
          );
          x.description = event.requestDetails;
          reformat.push(x);
        });
        setRequests(reformat);
        console.log(reformat);
      });
    });
  }, []);

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
          events={requests}
          headerDateFormat="d, dddd"
          onEventClick={(args) => {
            //Onclick maybe will open request pop up to view summary. With choice to enter to request page.
            setSelectedReq(args.e.data);
            setRequestVisible(true);
          }}
          eventMoveHandling="Disabled"
        />
        <Dialog
          visible={calendarVisible}
          style={{ width: "25vw" }}
          onHide={() => setCalendarVisible(false)}
          draggable={false}
          header="Week Selection"
        >
          <div className="m-auto w-min">
            <DayPilotNavigator
              onTimeRangeSelected={(args) => {
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
              to={"/requests/" + selectedReq.id}
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
