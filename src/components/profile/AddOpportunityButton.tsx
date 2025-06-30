
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useFeatureToggle } from '@/hooks/useFeatureToggle';

const AddOpportunityButton = () => {
  const { isEnabled: canCreatePosts, loading } = useFeatureToggle('user_opportunity_posts');

  if (loading) {
    return (
      <Button disabled className="bg-blue-600 hover:bg-blue-700">
        <Plus className="w-4 h-4 mr-2" />
        Loading...
      </Button>
    );
  }

  if (!canCreatePosts) {
    return (
      <Button disabled className="bg-gray-400 cursor-not-allowed">
        <Plus className="w-4 h-4 mr-2" />
        Create Disabled
      </Button>
    );
  }

  return (
    <Link to="/create-opportunity">
      <Button className="bg-blue-600 hover:bg-blue-700">
        <Plus className="w-4 h-4 mr-2" />
        Create Opportunity
      </Button>
    </Link>
  );
};

export default AddOpportunityButton;
