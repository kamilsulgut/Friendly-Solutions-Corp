import React, { useState, useEffect } from "react";
import { myPromise } from "../data/data";
import { TableHeadData } from "./TableHeadData";

interface TableRow {
  work_order_id: number;
  description: string;
  received_date: string;
  assigned_to: {
    person_name: string;
    status: string;
  }[];
  status: string;
  priority: string;
}

const Table = () => {
  const [data, setData] = useState<TableRow[]>([]);

  useEffect(() => {
    myPromise
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className="wrapper">
        <table>
          <caption>
            <h2>Table Example</h2>
          </caption>
          <thead>
            <tr>
              {TableHeadData.map((el, i: number) => {
                return <th key={i}>{el}</th>;
              })}
            </tr>
          </thead>
          {data.map((el) => {
            return (
              <tbody key={el.work_order_id}>
                <tr>
                  <td>{el.work_order_id}</td>
                  <td>{el.description}</td>
                  <td>{el.received_date}</td>
                  <td>
                    {el.assigned_to.map((el) => {
                      return el.person_name;
                    })}
                  </td>
                  <td>{el.status}</td>
                  <td>{el.priority}</td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default Table;
