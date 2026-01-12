"use client"; // allow interactivity

import { useState } from "react"; // gives components memory

// app can't see
type Application = {
  id: string;
  company: string;
  role: string;
  status: "Applied" | "Interview" | "Offer" | "Rejected";
  createdAt: string;
}; 

// app can see
const STATUSES: Application["status"][] = [
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
];

export default function Home() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<Application["status"]>("Applied");
  const [filter, setFilter] = useState<"All" | Application["status"]>("All");

  const [apps, setApps] = useState<Application[]>([
    {
      id: "seed-1",
      company: "Example Co",
      role: "Software Intern",
      status: "Applied",
      createdAt: new Date().toLocaleDateString(),
    },
  ]);

  function addApplication(e: React.FormEvent) {
    e.preventDefault();

    const c = company.trim();
    const r = role.trim();
    if (!c || !r) return;

    const newApp: Application = {
      id: crypto.randomUUID(),
      company: c,
      role: r,
      status,
      createdAt: new Date().toLocaleDateString(),
    };

    setApps((prev) => [newApp, ...prev]);
    setCompany("");
    setRole("");
    setStatus("Applied");
  }

  function removeApplication(id: string) {
    setApps((prev) => prev.filter((a) => a.id !== id));
  }

  const visibleApps =
    filter === "All" ? apps : apps.filter((a) => a.status === filter);

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <header className="space-y-1">
          <h1 className="text-3xl font-bold">Internship Tracker</h1>
          <p className="text-sm text-gray-500">
            MVP: add applications, filter, delete. (DB next.)
          </p>
        </header>

        <section className="rounded-xl border p-4">
          <h2 className="mb-3 text-lg font-semibold">Add an application</h2>

          <form onSubmit={addApplication} className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-sm font-medium">Company</label>
                <input
                  className="w-full rounded-md border px-3 py-2"
                  placeholder="e.g., Stripe"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Role</label>
                <input
                  className="w-full rounded-md border px-3 py-2"
                  placeholder="e.g., SWE Intern"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-sm font-medium">Status</label>
                <select
                  className="w-full rounded-md border px-3 py-2"
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as Application["status"])
                  }
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Filter</label>
                <select
                  className="w-full rounded-md border px-3 py-2"
                  value={filter}
                  onChange={(e) =>
                    setFilter(e.target.value as "All" | Application["status"])
                  }
                >
                  <option value="All">All</option>
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="
                inline-flex items-center justify-center
                rounded-lg border border-black
                bg-black px-4 py-2
                text-sm font-medium text-white
                hover:bg-gray-800
                transition
              "
            >
              Add
            </button>
          </form>
        </section>

        <section className="rounded-xl border p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Applications{" "}
              <span className="text-sm font-normal text-gray-500">
                ({visibleApps.length})
              </span>
            </h2>
          </div>

          {visibleApps.length === 0 ? (
            <p className="text-sm text-gray-500">
              Nothing here yet — add your first application above.
            </p>
          ) : (
            <ul className="space-y-2">
              {visibleApps.map((a) => (
                <li
                  key={a.id}
                  className="flex items-start justify-between gap-3 rounded-lg border p-3"
                >
                  <div>
                    <div className="font-medium">
                      {a.company} — {a.role}
                    </div>
                    <div className="text-sm text-gray-500">
                      Status: {a.status} • Added: {a.createdAt}
                    </div>
                  </div>

                  <button
                    onClick={() => removeApplication(a.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
