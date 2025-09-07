// anatomy of react component
export default function MyComponent(props) {
  return <div>Hello, world! My name is {props.name}</div>;
}

const html = <MyComponent name="John" />;


// React Hook: useState, component only re-render when: value inside prop changes or a useState setter is called
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p> Count: {count} </p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}