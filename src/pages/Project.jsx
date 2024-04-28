import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { getUserStories } from "../services/apiUserStories";

export default function Project() {
  const { id } = useParams();
  //   const [userStory, setUserStory] = useState();

  const { data: userStories, isLoading } = useQuery({
    queryKey: ["userStories", id],
    queryFn: () => getUserStories(id),
  });

  // if data is empty prepopulate the table with empty rows
  if (userStories?.length === 0)
    for (let i = 0; i < 4; i++) {
      userStories.push({
        id: i + 1,
        title: "",
        effortEstimate: "",
        startDate: "",
        endDate: "",
        status: "",
        assigned: "",
      });
    }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>User Stories</th>
            <th>Effort Estimate</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Assigned</th>
          </tr>
        </thead>
        <tbody>
          {userStories?.map((userStory) => (
            <tr key={userStory.id}>
              <td>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={userStory.title}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="effortEstimate"
                  id="effortEstimate"
                  value={userStory.effortEstimate}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="startDate"
                  id="startDate"
                  value={userStory.startDate}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="endDate"
                  id="endDate"
                  value={userStory.endDate}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="status"
                  id="status"
                  value={userStory.status}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="assigned"
                  id="assigned"
                  value={userStory.assigned}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
