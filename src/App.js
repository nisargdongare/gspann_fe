import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [UserDetails, setUserDetails] = useState([]);
  const [DisplayDetails, setDisplayDetails] = useState([]);
  const [PerPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [PageNumbers, setPageNumbers] = useState([]);
  useEffect(() => {
    GetDataFromAPI();
  }, []);

  useEffect(() => {
    UpdateDisplayDetails(UserDetails, currentPage);
  }, [currentPage]);

  const UpdateDisplayDetails = (User, currentPage) => {
    console.log("innn");
    let LastIndex = currentPage * PerPage;
    let StartIndex = LastIndex - PerPage;
    console.log(StartIndex, LastIndex);
    const currentItems = User.slice(StartIndex, LastIndex);
    setDisplayDetails(currentItems);
  };

  const GetDataFromAPI = async () => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        let resp = res.data;
        UpdateDisplayDetails(resp);
        setUserDetails(resp);
        let TotalCount = resp.length;
        let TotalPagination = TotalCount / PerPage;
        console.log(TotalCount, TotalPagination);
        let TempArray = [];
        for (let i = 1; i <= TotalPagination; i++) {
          TempArray.push(i);
        }
        setPageNumbers(TempArray);
      })
      .catch((e) => console.log("error"));
  };
  return (
    <div className="App">
      <h1>Hello Test Application</h1>
      {DisplayDetails.length &&
        DisplayDetails.map((x, i) => {
          return (
            <div>
              {i + 1}.{x.title}
            </div>
          );
        })}
      {PageNumbers.map((x) => {
        return (
          <button
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
