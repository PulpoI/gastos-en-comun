import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useGroups } from "../context/GroupsContext";
import CardGroup from "../components/CardGroup";

const GroupsExpenses = () => {
  const { user } = useAuth();
  const { getGroups, grupsUser } = useGroups();

  useEffect(() => {
    getGroups(user);
  }, []);

  console.log(grupsUser);

  return (
    <>
      {!grupsUser ? (
        <p>No hay grupos</p>
      ) : Array.isArray(grupsUser) ? (
        <div className="container flex flex-wrap">
          {grupsUser.map((group: any) => (
            <CardGroup group={group} key={group.id_group} />
          ))}
        </div>
      ) : (
        <p>grupsUser is not an array</p>
      )}
    </>
  );
};

export default GroupsExpenses;
