"use client";

import React, { useEffect, useState } from "react";

export default function () {
  const [data, setData] = useState(null);

  useEffect(() => {
    // API çağrısı yaparak verileri alabilirsiniz
    // fetch("/api/dashboard")
    //   .then((response) => response.json())
    //   .then((data) => setData(data));
  }, []);
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
