
import { useState } from "react";
import "./App.css";

const tips = [
  "Plan your route before travelling.",
  "Keep your phone charged.",
  "Share your journey with a trusted person.",
  "Protect your personal information.",
];

function App() {
  const [page, setPage] = useState("Home");
  const [contacts, setContacts] = useState([{ name: "", phone: "" }]);
  const [location, setLocation] = useState("");
  const [incident, setIncident] = useState("");
  const [reports, setReports] = useState([]);
  const [fakeCall, setFakeCall] = useState(false);
  const [message, setMessage] = useState("");

  const pages = [
    "Home", "Emergency SOS", "Contacts",
    "Fake Call", "Safety Tips", "Report Incident", "Nearby Services",
  ];

  function getLocation() {
    if (!navigator.geolocation) {
      setMessage("Location is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(
          `${position.coords.latitude}, ${position.coords.longitude}`
        );
        setMessage("Location retrieved. It has not been shared.");
      },
      () => setMessage("Location permission denied.")
    );
  }

  function submitReport(event) {
    event.preventDefault();
    if (!incident.trim()) return;
    setReports([...reports, incident.trim()]);
    setIncident("");
    setMessage("Demo report saved in this page session only.");
  }

  return (
    <div className="app">
      <header>
        <h2>♥ WomenSafe</h2>
        <nav>
          {pages.map((item) => (
            <button key={item} onClick={() => {
              setPage(item);
              setMessage("");
            }}>
              {item}
            </button>
          ))}
        </nav>
      </header>

      {message && <p className="message">{message}</p>}

      <main>
        {page === "Home" && (
          <section className="hero">
            <p>WOMEN'S SAFETY PLATFORM</p>
            <h1>Your Safety, Our Priority.</h1>
            <p>Safety support for female university students.</p>
            <button onClick={() => setPage("Emergency SOS")}>
              Emergency Support
            </button>
          </section>
        )}

        {page === "Emergency SOS" && (
          <section className="panel">
            <h1>Emergency Support</h1>
            <p>In Bangladesh, call 999 if you need emergency assistance.</p>
            <button className="danger" onClick={() =>
              setMessage("Demo only: No call, SMS, or emergency alert was sent.")
            }>
              SOS — Get Help
            </button>
            <h2>Location</h2>
            <button onClick={getLocation}>Get My Location</button>
            {location && <p>{location}</p>}
          </section>
        )}

        {page === "Contacts" && (
          <section className="panel">
            <h1>Trusted Contacts</h1>
            {contacts.map((contact, index) => (
              <div key={index}>
                <input
                  placeholder="Contact name"
                  value={contact.name}
                  onChange={(e) => setContacts(contacts.map((c, i) =>
                    i === index ? { ...c, name: e.target.value } : c
                  ))}
                />
                <input
                  placeholder="Phone number"
                  value={contact.phone}
                  onChange={(e) => setContacts(contacts.map((c, i) =>
                    i === index ? { ...c, phone: e.target.value } : c
                  ))}
                />
              </div>
            ))}
            <button onClick={() => setContacts([
              ...contacts, { name: "", phone: "" }
            ])}>
              Add Contact
            </button>
            <p>Contacts are temporary and are not saved to a database.</p>
          </section>
        )}

        {page === "Fake Call" && (
          <section className="panel">
            <h1>Fake Call Simulation</h1>
            {fakeCall && <h2>☎ Incoming Call — Demo</h2>}
            <button onClick={() => setFakeCall(!fakeCall)}>
              {fakeCall ? "End Demo Call" : "Simulate Incoming Call"}
            </button>
          </section>
        )}

        {page === "Safety Tips" && (
          <section className="panel">
            <h1>Safety Tips</h1>
            {tips.map((tip, index) => <p key={index}>✓ {tip}</p>)}
          </section>
        )}

        {page === "Report Incident" && (
          <section className="panel">
            <h1>Incident Report</h1>
            <form onSubmit={submitReport}>
              <textarea
                required
                value={incident}
                onChange={(e) => setIncident(e.target.value)}
                placeholder="Describe the incident"
              />
              <button type="submit">Submit Demo Report</button>
            </form>
            {reports.map((report, index) => (
              <p key={index}>{report}</p>
            ))}
            <small>Reports are temporary and have not been sent to a server.</small>
          </section>
        )}

        {page === "Nearby Services" && (
          <section className="panel">
            <h1>Nearby Services</h1>
            <p>
              <a href="https://www.police.gov.bd/" target="_blank"
                rel="noreferrer">Bangladesh Police website</a>
            </p>
            <p>
              <a href="https://www.google.com/maps/search/hospitals+near+me/"
                target="_blank" rel="noreferrer">Find nearby hospitals</a>
            </p>
          </section>
        )}
      </main>

      <footer>Women Protection Application | Project 300</footer>
    </div>
  );
}

export default App;
