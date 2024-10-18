import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

// Define types for UserDetails
interface UserDetail {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function App() {
  const [UserDetails, setUserDetails] = useState<UserDetail[]>([]);
  const [DisplayDetails, setDisplayDetails] = useState<UserDetail[]>([]);
  const [PerPage, setPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [PageNumbers, setPageNumbers] = useState<number[]>([]);

  useEffect(() => {
    GetDataFromAPI();
  }, []);

  useEffect(() => {
    UpdateDisplayDetails(UserDetails, currentPage);
  }, [currentPage]);

  const UpdateDisplayDetails = (User: UserDetail[], currentPage: number) => {
    let LastIndex = currentPage * PerPage;
    let StartIndex = LastIndex - PerPage;
    const currentItems = User.slice(StartIndex, LastIndex);
    setDisplayDetails(currentItems);
  };

  const GetDataFromAPI = async () => {
    try {
      const res = await axios.get<UserDetail[]>("https://jsonplaceholder.typicode.com/posts");
      let resp = res.data;
      UpdateDisplayDetails(resp, currentPage);
      setUserDetails(resp);

      let TotalCount = resp.length;
      let TotalPagination = Math.ceil(TotalCount / PerPage);
      let TempArray = [];

      for (let i = 1; i <= TotalPagination; i++) {
        TempArray.push(i);
      }
      setPageNumbers(TempArray);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="App">
      <h1>Hello Test Application</h1>
      {DisplayDetails.length > 0 &&
        DisplayDetails.map((x, i) => {
          return (
            <div key={i}>
              {i + 1}.{x.title}
            </div>
          );
        })}
      {PageNumbers.map((x) => {
        return (
          <button
            key={x}
            onClick={() => {
              setCurrentPage(x);
            }}
          >
            {x}
          </button>
        );
      })}
      <pre>{JSON.stringify(UserDetails, null, 2)}</pre>
    </div>
  );
}
