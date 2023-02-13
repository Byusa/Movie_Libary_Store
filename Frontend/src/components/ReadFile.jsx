import React, { useState } from 'react';

const CSVReader = () => {
  const [data, setData] = useState([]);
  
  const handleChange = (e) => {
    let files = e.target.files;
    if (files && files.length > 0) {
      readFile(files[0]);
    }
  };
  
  const readFile = (file) => {
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      let csv = e.target.result;
      let lines = csv.split("\n").slice(1);
      console.log("line ==", lines)
      let result = lines.map((line) => line.split(","));
      setData(result);
    };
  };

  return (
    <div>
      <h3>Upload CSV File</h3>
      <input type="file" onChange={handleChange} accept=".csv" />
      <div>
        {data.map((row, index) => (
          <div key={index}>
            {row.map((cell, index) => (
              <span key={index}>{cell} </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CSVReader;
