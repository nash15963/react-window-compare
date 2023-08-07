/** @format */

import React, { useState } from "react";
import "./App.css";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

interface IPerson {
  name: string;
  age: number;
  uuid: string;
}

const excludeProperties = ["propertyToExclude1", "propertyToExclude2", "uuid"];

function ObjExample() {
  const [list1, setList1] = useState<IPerson[]>([]);
  const [list2, setList2] = useState<IPerson[]>([]);

  const BigStringList = () => {
    const list: IPerson[] = [];
    for (let i = 0; i < 1000; i++) {
      list.push({ name: `fake Person -- ${i}`, age: i, uuid: `uuid-${i}` });
    }
    return list;
  };

  const generateList = () => {
    const list = BigStringList();
    setList1(list);
  };

  const generateList2 = () => {
    const list = BigStringList();
    setList2(list);
  };

  const AllRows1 = () =>
    list2.map((i, index) => <div key={index}>{i.name}</div>);

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "90%",
          margin: "50px auto",
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            ...outterBoxStyles,
          }}
        >
          <h1>Without Optimization</h1>
          <button onClick={generateList}>Generate List</button>
          <div
            style={{
              ...boxStyles,
              overflow: "scroll",
            }}
          >
            {list1.map((item, index) => (
              <div key={`a-${index}`} className="outter">
                {/* need to be vertualize */}
                <p>
                  <input type="checkbox" />
                  <div key={index}>
                    {Object.entries(item).map(([key, value]) => {
                      // Check if the property is not in the exclude list before rendering
                      if (!excludeProperties.includes(key)) {
                        return (
                          <div key={key}>
                            <span>{value}</span>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            ...outterBoxStyles,
          }}
        >
          <h1>Optimization</h1>
          <button onClick={generateList2}>Generate List</button>
          <div
            style={{
              ...boxStyles,
              overflow: "scroll",
            }}
          >
            <AutoSizer>
              {({ height, width }: { height: number; width: number }) => (
                <List
                  width={width}
                  height={height}
                  itemCount={list2.length}
                  itemSize={40}
                  itemData={list2}
                >
                  {/* {AllRows1} */}
                  {AllRows}
                </List>
              )}
            </AutoSizer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ObjExample;

interface RowProps {
  data: string[];
  index: number;
  style: React.CSSProperties;
}

const Row = ({ data, index, style }: RowProps) => (
  <div style={{ ...style }}>
    <p style={{ margin: "40px auto", color: "red" }}>
      <input type="checkbox" />
      {data[index]}
    </p>
  </div>
);

interface AllRowsProps {
  data: IPerson[];
  index: number;
  style: React.CSSProperties;
}

const AllRows = ({ data, index, style }: AllRowsProps) => {
  const item = data[index];
  return (
    <div style={{ ...style }} key={`AllRows-${index}`}>
      {/* {data.map((item: IPerson, index: number) => (
        <div key={`a-${index}`}>
          {item.name}
          <p>
            <input type="checkbox" />
            <div>
              {Object.entries(item).map(([key, value]) => {
                if (!excludeProperties.includes(key)) {
                  return (
                    <div key={key}>
                      <strong>{key}: </strong>
                      {value}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </p>
        </div>
      ))} */}
      {Object.entries(item).map(([key, value]) => {
        if (!excludeProperties.includes(key)) {
          return (
            <div key={key}>
              <strong>{key}: </strong>
              {value}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

const boxStyles = {
  width: "95%",
  height: "70%",
  border: "1px solid black",
  margin: "auto",
};

const outterBoxStyles = {
  width: 500,
  height: 500,
  border: "1px solid black",
};
