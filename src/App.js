import Navbar from "./components/Navbar";
import { FaNewspaper } from "react-icons/fa";
import { SiSharp } from "react-icons/si";
import { BiHeart, BiRefresh } from "react-icons/bi";
import { useEffect, useState } from "react";
import axios from "axios";
import Signal from "./components/Signal";
import { IoIosHeart, IoIosRefresh } from "react-icons/io";
import { BiChevronDown } from "react-icons/bi";
import LinearProgress from "@mui/material/LinearProgress";
import { toast, ToastContainer } from "react-toastify";
function App() {
  const initialsDetails = [
    {
      name: "Populis",
      statusUrl: null,
      statusArtikel: null,
      message: null,
      url: "populis.id",
      artikelUrl: "populis.id",
    },
    {
      name: "Wartaekonomi",
      statusUrl: null,
      statusArtikel: null,
      message: null,
      url: "wartaekonomi.co.id",
      artikelUrl: "wartaekonomi.co.id",
    },
    {
      name: "News Wartaekonomi",
      statusUrl: null,
      statusArtikel: null,
      message: null,
      url: "nw.wartaekonomi.co.id",
      artikelUrl: "nw.wartaekonomi.co.id",
    },
    {
      name: "HerStory",
      statusUrl: null,
      statusArtikel: null,
      message: null,
      url: "herstory.co.id",
      artikelUrl: "herstory.co.id",
    },
    {
      name: "Konten Jatim",
      statusUrl: null,
      statusArtikel: null,
      message: null,
      url: "kontenjatim.id",
      artikelUrl: "kontenjatim.id",
    },
  ];

  const countDownsArr = [
    {
      name: "30 Detik",
      value: 30,
    },
    {
      name: "1 Menit",
      value: 60,
    },
    {
      name: "2 Menit",
      value: 60 * 2,
    },
    {
      name: "5 Menit",
      value: 60 * 5,
    },
    {
      name: "1 Jam",
      value: 60 * 60,
    },
  ];
  const [details, setDetails] = useState(initialsDetails);
  const [showDropdown, setShowDropdown] = useState(false);
  const [defaultCounter, setDefaultCounter] = useState(countDownsArr[1].value);
  const [defaultCountdown, setDefaultCountdown] = useState(
    countDownsArr[1].name
  );
  const [counter, setCounter] = useState(defaultCounter);
  const [progress, setProgress] = useState(100);
  const getStatus = async (res, index) => {
    try {
      const response = await axios(`https://cors-pega.vercel.app/api`, {
        method: "POST",
        params: {
          u: `https://${res.url}`,
        },
      });
      console.log(`Status ${res.name} ${response.status}`);
      const update = [...details];
      update[index].statusUrl = response.status;
      setDetails(update);
    } catch (err) {
      if (err.code === "ERR_NETWORK") {
        toast.error(err.code);
      } else {
        toast.error(err);
      }
    }
  };
  const toPercent = (counter) => {
    const elCount = (counter - defaultCounter) / defaultCounter;
    return Math.floor(elCount * 100);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (counter != 0) {
        const elCount = counter - 1;
        const percent = toPercent(elCount);
        const revPercent = 100 + percent;
        setProgress(revPercent);
        setCounter(elCount);
      } else {
        setDetails([]);
        setProgress(100);
        setCounter(defaultCounter);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [counter]);

  useEffect(() => {
    if (details.length === 0) {
      setDetails(initialsDetails);
    }
    details.map((el, index) => {
      if (el.statusArtikel || el.statusUrl === null) {
        getStatus(el, index);
      }
    });
  }, [details]);
  useEffect(() => {
    document.title = "WE Analytics";
  }, []);
  return (
    <>
      <div className="min-w-full min-h-full  flex flex-col items-center">
        <Navbar>
          <div className="text-white  bg-slate-400 w-48">
            <div className="flex items-center justify-center ">
              <button
                onClick={() => window.location.reload()}
                className=" rounded-sm flex items-center justify-center border-r-2 border-white/50 bg-slate-500 w-[30%] h-10 hover:bg-slate-500/50 duration-300 transition ease-linear cursor-pointer"
              >
                <span className="text-lg flex items-center justify-center">
                  <IoIosRefresh />
                </span>
              </button>
              <div className="relative flex rounded-sm  border-white/50 bg-slate-500  w-[100%] h-10 hover:bg-slate-500/50 duration-300 transition ease-linear cursor-pointer">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-full text-sm flex items-center justify-around space-x-2 cursor-pointer"
                >
                  <span>{defaultCountdown}</span>
                  <span>
                    <BiChevronDown />
                  </span>
                </button>
                <div
                  className={`absolute ${
                    showDropdown ? "flex" : "hidden"
                  } flex-col items-center mt-12 z-50 bg-slate-500  top-0 w-full rounded-sm`}
                >
                  <ul className="text-white text-sm space-y-2 w-full flex flex-col items-center justify-center">
                    {countDownsArr?.map((data, index) => (
                      <li
                        onClick={() => {
                          setShowDropdown(false);
                          setProgress(100);
                          setCounter(data.value);
                          setDefaultCounter(data.value);
                          setDefaultCountdown(data.name);
                        }}
                        key={index}
                        className="px-4 py-2 w-full flex flex-col items-center justify-center"
                      >
                        {data.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <LinearProgress
              variant="determinate"
              color="inherit"
              value={progress}
            />
          </div>
        </Navbar>
        <div className="sm:w-[1000px] h-full flex items-center ">
          <div className="flex gap-2 flex-wrap justify-center items-center py-2">
            {details.length > 0 &&
              details.map((res, index) => (
                <div
                  key={index}
                  className="bg-slate-600 sm:w-[45%] w-[80%] py-2 px-4 rounded-lg"
                >
                  <div className="flex justify-between  mb-2">
                    <span className="text-white text-xl font-bold">
                      {res.name}
                    </span>
                    <span className="text-white text-sm flex space-x-2 items-center">
                      <span className="text-slate-300">
                        {res.statusUrl === 200 ? "200 OK" : res.statusUrl}{" "}
                      </span>
                      <span className="flex h-3 w-3">
                        <Signal show={res.statusUrl === 200 ? true : false} />
                      </span>
                    </span>
                  </div>

                  <div className="border-b-2" />
                  <div className="flex flex-col text-white space-y-2 my-4">
                    <span className="text-sm flex justify-between items-center">
                      <span className="flex flex-col">
                        <span className="text-lg inline-flex items-center space-x-2">
                          <span className="text-xs">
                            <SiSharp />
                          </span>
                          <span>Root</span>
                        </span>
                        <span className="text-xs opacity-60">{">"} /</span>
                      </span>
                      <span className="flex  space-x-2 items-center">
                        <span className="text-slate-300">
                          {res.statusUrl === 200 ? "200 OK" : res.statusUrl}{" "}
                        </span>

                        <span className="flex h-3 w-3">
                          <Signal show={res.statusUrl === 200 ? true : false} />
                        </span>
                      </span>
                    </span>
                    <span className="text-sm flex justify-between items-center">
                      <span className="flex flex-col">
                        <span className="text-lg inline-flex items-center space-x-2">
                          <span className="text-xs">
                            <FaNewspaper />
                          </span>
                          <span>Artikel</span>
                        </span>
                        <span className="text-xs opacity-60">
                          {">"} comingsoon ... {res.status}
                        </span>
                      </span>
                      <span className="flex  space-x-2 items-center">
                        <span className="text-slate-300">
                          {res.statusArtikel === 200
                            ? "200 OK"
                            : res.statusArtikel}{" "}
                        </span>
                        <span className="flex h-3 w-3">
                          <Signal
                            color={"bg-yellow-400"}
                            show={res.statusArtikel === 200 ? true : false}
                          />
                        </span>
                      </span>
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <ToastContainer />
        <div className="sm:absolute sm:bottom-0 bg-slate-600 min-w-full h-24 flex py-4 justify-center ">
          <span className="inline-flex space-x-1 items-center  text-white">
            <span className="">Made with</span>
            <span>
              <IoIosHeart />
            </span>
            <span>by</span>
            <span className="font-extrabold">Pega</span>
          </span>
        </div>
        {showDropdown && (
          <div
            onClick={() => setShowDropdown(!showDropdown)}
            className="absolute z-30  min-w-full min-h-full"
          />
        )}
      </div>
    </>
  );
}

export default App;
