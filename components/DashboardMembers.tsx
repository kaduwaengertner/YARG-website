import { useState } from "react";
import MemberInfo from "./MemberInfo";

function DashboardMembers() {
  const [searchType, setSearchType] = useState("name");
  const [searchValue, setSearchValue] = useState("");
  const [memberData, setMemberData] = useState<MemberData | null>(null);

  const handleSearchTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchType(event.target.value);
  };

  const handleSearchValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEXT_PUBLIC_STREAM_DATABASE}/members.json`
      );
      const data = await response.json();

      if (searchType === "id") {
        if (data.hasOwnProperty(searchValue)) {
          setMemberData(data[searchValue]);
        } else {
          setMemberData(null);
        }
      } else if (searchType === "name") {
        const result = Object.entries(data).find(
          ([id, member]) =>
            member.name.toLowerCase() === searchValue.toLowerCase()
        );

        if (result) {
          setMemberData(result[1]);
        } else {
          setMemberData(null);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Dashboard Members</h1>

      <div>
        <label>
          <input
            type="radio"
            name="searchType"
            value="id"
            checked={searchType === "id"}
            onChange={handleSearchTypeChange}
          />
          Search by ID
        </label>
        <label>
          <input
            type="radio"
            name="searchType"
            value="name"
            checked={searchType === "name"}
            onChange={handleSearchTypeChange}
          />
          Search by Name
        </label>
      </div>

      <div>
        <input
          type="text"
          value={searchValue}
          onChange={handleSearchValueChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {memberData && <MemberInfo memberData={memberData} />}
    </div>
  );
}

export default DashboardMembers;
