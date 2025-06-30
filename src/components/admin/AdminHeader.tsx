import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
const AdminHeader = () => {
  return <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin</h1>
        <p className="text-gray-600">Comprehensive platform management and analytics</p>
      </div>
      <Button className="bg-blue-600 hover:bg-blue-700">
        <Plus className="w-4 h-4 mr-2" />
        Add Opportunity
      </Button>
    </div>;
};
export default AdminHeader;