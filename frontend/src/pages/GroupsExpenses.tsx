import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useGroups } from "../context/GroupsContext";
import CardGroup from "../components/CardGroup";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const GroupsExpenses = () => {
  const { user } = useAuth();
  const { getGroups, grupsUser } = useGroups();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getGroups(user);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);
  if (loading) return <Loading type={"groups"} />;
  return (
    <>
      {!grupsUser ? (
        <p>No hay grupos</p>
      ) : Array.isArray(grupsUser) ? (
        <>
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
              Grupos de gastos
            </h1>
            <p className="max-w-lg mx-auto mt-4 text-gray-500">
              Acá puedes ver todos los grupos de gastos a los que perteneces.
            </p>
          </div>
          <div className="container flex flex-wrap">
            {grupsUser.map((group: any) => (
              <CardGroup group={group} key={group.id_group} />
            ))}
          </div>
        </>
      ) : (
        <p>grupsUser is not an array</p>
      )}
    </>
  );
};

export default GroupsExpenses;
