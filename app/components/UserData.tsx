"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [users, setUsers] = useState<{ name: string; phone: string }[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone }),
    });
    setName("");
    setPhone("");
    fetchUsers();
  };

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <h3>Users List</h3>
      <ul>
        {users.map((u, i) => (
          <li key={i}>
            {u.name} — {u.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}
