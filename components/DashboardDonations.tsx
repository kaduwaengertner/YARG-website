import React, { useState, useEffect } from "react";
import axios from "axios";

const DashboardDonations = () => {
  const [donations, setDonations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [donationsPerPage] = useState(10);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get(`https://api.streamelements.com/kappa/v2/activities/channel`, {
          headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjaXRhZGVsIiwiY2hhbm5lbCI6IjVmNGE4M2ZiMGE1MmMzOWZkOTU5YzA1YSIsInJvbGUiOiJvd25lciIsImF1dGhUb2tlbiI6Il8tUnJzQXdSMWt5ZTdEYXJISHVEYnpXeVA0ekw0ODJYeVE2UkFqR1lBYnBTWHFwTyIsInVzZXIiOiI1ZjRhODNmYjBhNTJjM2FmOTE1OWMwNTkiLCJ1c2VyX2lkIjoiOGEzMTJkNTAtNWQ0MC00NmY4LWJkMDctYTA4MjM4OTFjMDA1IiwidXNlcl9yb2xlIjoiY3JlYXRvciIsInByb3ZpZGVyIjoidHdpdGNoIiwicHJvdmlkZXJfaWQiOiI1NzQ3MDE5NDciLCJjaGFubmVsX2lkIjoiNjRmM2QyYzEtZTQ2Ny00ZWZjLThkOTctYTljNjdhNjI3ZDM2IiwiY3JlYXRvcl9pZCI6ImU3NTkyMDFmLWJmZDYtNDU2My04ZDEyLTk2YWE2MWYzNDkyYyJ9.iSr2VKSj_49IX03JwEsB9JNknOefyvTFiuN316HabsU",
            "Content-Type": "application/json"
          }
        });
        setDonations(response.data);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };
    fetchDonations();
  }, [currentPage]);

  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  return (
    <div>
      <h1>Donations</h1>
      <ul>
        {donations.map((donation) => (
          <li key={donation._id}>
            {donation.name} donated {donation.amount} {donation.currency} ({donation.message})
          </li>
        ))}
      </ul>
      <div>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <button onClick={nextPage}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default DashboardDonations;
