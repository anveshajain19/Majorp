import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { AiOutlineClear } from "react-icons/ai";
import { MdArrowBack } from "react-icons/md";
import { useRouter } from "next/router";
import Loader from "../Loader";

export default function Whiteboard({ username }) {
  const [cookieUsername, setCookieUsername, removeCookieUsername] = useCookies([
    "username",
  ]);
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const [auth_token, setAuthToken] = useState("");
  const router = useRouter();

  const [penColor, setPenColor] = useState("blue");
  const [penSize, setPenSize] = useState(5);
  const [isEraser, setIsEraser] = useState(false);

  useEffect(() => {
    if (cookie["token"]) {
      setAuthToken(cookie["token"]);
    }
  }, [cookie["token"]]); // Correct dependency
  

  const [ws, setWs] = useState(undefined);
  const [con, setCon] = useState(false);

  useEffect(() => {
    const socket = new WebSocket("ws://127.0.0.1:8000/ws/whiteboard/");
    setWs(socket);
    setCon(true);

    socket.addEventListener("open", () => {
      console.log("open connection");

      socket.send(
        JSON.stringify({
          command: "join",
          groupname: username,
          user_name: cookieUsername["username"],
        })
      );
    });

    socket.onmessage = (e) => {
      console.log("message arrived");

      const data = JSON.parse(e.data);
      if (data.warning) {
        alert("Something went wrong");
      } else if (data.command === "canvas-data") {
        var image = new Image();
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        image.onload = function () {
          ctx.drawImage(image, 0, 0);
        };
        image.src = data.data;
      } else if (data.command === "canvas-clear") {
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    return () => {
      socket.close();
    };
  }, [username, cookieUsername["username"]]); // Added dependencies

  useEffect(() => {
    if (ws && con) {
      drawOnCanvas();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ws, con, auth_token, penColor, penSize, isEraser]); // Added dependencies

  useEffect(() => {
    if (ws && con) {
      // Update the drawing settings in the existing context
      var canvas = document.querySelector("#canvas");
      var ctx = canvas.getContext("2d");
      ctx.lineWidth = penSize;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.strokeStyle = isEraser ? "#FFFFFF" : penColor;
    }
  }, [penColor, penSize, isEraser, ws, con]);

  var timeout;

  function drawOnCanvas() {
    var canvas = document.querySelector("#canvas");
    var ctx = canvas.getContext("2d");

    var sketch = document.querySelector("#sketch");
    var sketch_style = getComputedStyle(sketch);
    canvas.width = parseInt(sketch_style.getPropertyValue("width"));
    canvas.height = parseInt(sketch_style.getPropertyValue("height"));

    var mouse = { x: 0, y: 0 };
    var last_mouse = { x: 0, y: 0 };

    /* Mouse Capturing Work */
    canvas.addEventListener(
      "mousemove",
      function (e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
      },
      false
    );

    /* Drawing on Paint App */
    const updateDrawingSettings = () => {
      ctx.lineWidth = penSize;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.strokeStyle = isEraser ? "#FFFFFF" : penColor; // White for eraser
    };

    updateDrawingSettings();

    canvas.addEventListener(
      "mousedown",
      function (e) {
        updateDrawingSettings();
        canvas.addEventListener("mousemove", onPaint, false);
      },
      false
    );

    canvas.addEventListener(
      "mouseup",
      function () {
        canvas.removeEventListener("mousemove", onPaint, false);
      },
      false
    );

    var onPaint = function () {
      ctx.beginPath();
      ctx.moveTo(last_mouse.x, last_mouse.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.closePath();
      ctx.stroke();

      if (timeout !== undefined) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        var base64Imagedata = canvas.toDataURL("image/png");

        console.log("sending data");
        ws.send(
          JSON.stringify({
            command: "canvas-data",
            data: base64Imagedata,
            token: auth_token,
            groupname: username,
            user_name: cookieUsername["username"],
          })
        );
      }, 1000);
    };
  }

  const clearCanvas = () => {
    if (ws) {
      ws.send(
        JSON.stringify({
          command: "canvas-clear",
          token: auth_token,
          groupname: username,
          user_name: cookieUsername["username"],
        })
      );
      // Additionally clear the local canvas
      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const disconnectBoard = () => {
    if (ws) {
      ws.close();
    }
    router.push(`/playground/${username}`);
  };

  return (
    <>
      {ws ? (
        <div className="container mt-8 px-8">
          <div className="flex justify-between mb-4">
            <button
              className="bg-success text-black p-3 rounded-full text-xl"
              onClick={disconnectBoard}
            >
              <MdArrowBack />
            </button>

            <button
              className="bg-success text-black p-3 rounded-full text-xl"
              onClick={clearCanvas}
            >
              <AiOutlineClear />
            </button>
          </div>

          {/* Editing Controls */}
          <div className="controls flex space-x-4 mb-4">
            {/* Pen Color Selector */}
            <div>
              <label htmlFor="penColor" className="mr-2">
                Pen Color:
              </label>
              <input
                type="color"
                id="penColor"
                value={penColor}
                onChange={(e) => setPenColor(e.target.value)}
              />
            </div>

            {/* Pen Size Selector */}
            <div>
              <label htmlFor="penSize" className="mr-2">
                Pen Size:
              </label>
              <input
                type="range"
                id="penSize"
                min="1"
                max="20"
                value={penSize}
                onChange={(e) => setPenSize(e.target.value)}
              />
              <span className="ml-2">{penSize}</span>
            </div>

            {/* Eraser Toggle */}
            <div>
              <button
                className={`p-2 rounded ${
                  isEraser ? "bg-red-500 text-white" : "bg-gray-300"
                }`}
                onClick={() => setIsEraser(!isEraser)}
              >
                {isEraser ? "Eraser On" : "Eraser Off"}
              </button>
            </div>
          </div>

          {/* Canvas */}
          <div id="sketch" className="sketch">
            <canvas id="canvas" className="bg-white w-full h-[500px]"></canvas>
          </div>
        </div>
      ) : (
        <div>
          <Loader />
        </div>
      )}
    </>
  );
}
