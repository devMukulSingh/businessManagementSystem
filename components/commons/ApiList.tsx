import { ApiAlert } from "../ui/api-alert";

interface IapiListProps {
  entityName: string;
  entityIdName: string;
}

const ApiList: React.FC<IapiListProps> = ({ entityName, entityIdName }) => {
  return (
    <main className="space-y-5">
      <header>
        <h1 className="text-3xl font-bold">Api</h1>
        <p className="text-sm text-slate-400">View Api calls</p>
      </header>
      <ApiAlert
        entityIdName=""
        entityName={entityName}
        title="GET"
        variant="public"
      />
      <ApiAlert
        entityIdName={entityIdName}
        entityName={entityName}
        title="GET"
        variant="public"
      />
      <ApiAlert
        entityIdName={entityIdName}
        entityName={entityName}
        title="POST"
        variant="admin"
      />
      <ApiAlert
        entityIdName={entityIdName}
        entityName={entityName}
        title="PATCH"
        variant="admin"
      />
      <ApiAlert
        entityIdName={entityIdName}
        entityName={entityName}
        title="DELETE"
        variant="admin"
      />
    </main>
  );
};

export default ApiList;
