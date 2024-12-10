"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Materials() {
  const [materials, setMaterials] = useState([]);
  const fetchMaterials = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/materials`)
      .then((res) => setMaterials(res.data.data))
      .catch((error) => console.log(error.message));
  };
  useEffect(() => {
    // API çağrısı yaparak malzemeleri alabilirsiniz
    fetchMaterials();
  }, []);

  return (
    <div className="min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Malzemeler</h1>
      <ul className="space-y-2">
        {materials.map((material) => (
          <li key={material.id} className="p-4 bg-white shadow rounded">
            {material.name}
          </li>
        ))}
      </ul>
    </div>
  );
}