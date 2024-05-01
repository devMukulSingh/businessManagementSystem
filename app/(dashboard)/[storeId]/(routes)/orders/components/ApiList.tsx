import { ApiAlert } from "@/components/ui/api-alert";

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
    </main>
  );
};

export default ApiList;
