/** @format */

import React, { useState } from "react";
import "./App.css";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

function App() {
  const [list1, setList1] = useState<string[]>([]);
  const [list2, setList2] = useState<string[]>([]);

  const BigStringList = () => {
    const list: string[] = [];
    for (let i = 0; i < 30000; i++) {
      list.push(`Item -- ${i}`);
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
            {list1.map((item, index) => {
              return (
                <div key={`a-${index}`}>
                  <p>
                    <input type="checkbox" />
                    {item}
                  </p>
                </div>
              );
            })}
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
              {({ height, width }:{height:number, width:number}) => (
                <List
                  width={width}
                  height={height}
                  itemCount={list2.length}
                  itemSize={40}
                  itemData={list2}
                >
                  {Row}
                </List>
              )}
            </AutoSizer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

interface RowProps {
  data: string[];
  index: number;
  style: React.CSSProperties;
}

const Row = ({ data, index, style }: RowProps) => (
  <div style={{...style}}>
    <p style={{ margin: '40px auto', color:'red'}}>
    <input type="checkbox" />
    {data[index]}
    </p>
  </div>
);

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
