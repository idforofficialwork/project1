import './App.css';
import Viewer from "./component/Viewer";
import Controller from "./component/Controller";
import React, { useRef, useEffect, useState, useReducer } from 'react';
import Even from "./component/Even";

function reducer(state, action) {
  switch(action.type) {
    case "SET":
      return action.value;
    default:
      return state;
  }
}
function App() {
  //const [count, setCount] = useState(0);
  const [count, dispatch] = useReducer(reducer, 0);
  const [text, setText] = useState("");
  const handleSetCount = (value) => {
    //setCount(value);
    dispatch({
      type: "SET",
      value,
    })
  }
  const handleChangeText = (e) => {
    setText(e.target.value);
  }
  const didMountRef = useRef(false);
  useEffect(()=>{
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    //console.log("업데이트: ", text, count)
  });
  useEffect(()=>{
    //console.log("컴포넌트 마운트");
  }, []);
  useEffect(()=>{
    const intervalID = setInterval(()=>{
      //console.log("깜빡");
    }, 1000);
    return (() => {
      //console.log("클린업");
      clearInterval(intervalID);
    });
  });
  return (
    <div className="App">
      <h1>Simple Counter Version 2</h1>
      <section>
        <input value={text} onChange={handleChangeText} />
      </section>
      <section>
        <Viewer count={count}/>
        {count % 2 === 0 && <Even />}
      </section>
      <section>
        <Controller count={count} handleSetCount={handleSetCount}/>
      </section>
    </div>
  );
}

export default App;
