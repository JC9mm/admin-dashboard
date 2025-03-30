import { useProfile } from "../hooks/useProfile";

const DashboardPage = () => {
  const profile = useProfile();

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-2xl shadow-lg bg-white space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="text-gray-600">Welcome, {profile?.username}</p>
    </div>
  );
};

export default DashboardPage;
