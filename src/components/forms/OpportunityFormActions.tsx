
import { Button } from '@/components/ui/button';
import { Send, Save, Eye } from 'lucide-react';

interface OpportunityFormActionsProps {
  userRole: 'user' | 'admin' | 'staff_admin';
  loading: boolean;
  onCancel: () => void;
  onSubmit: (isDraft?: boolean) => void;
}

const OpportunityFormActions = ({ userRole, loading, onCancel, onSubmit }: OpportunityFormActionsProps) => {
  const isAdmin = userRole === 'admin' || userRole === 'staff_admin';

  return (
    <div className="flex items-center justify-between pt-6 border-t">
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      
      <div className="flex gap-2">
        {!isAdmin && (
          <Button 
            type="button" 
            onClick={() => onSubmit()}
            disabled={loading}
          >
            <Send className="w-4 h-4 mr-2" />
            {loading ? 'Submitting...' : 'Send for Review'}
          </Button>
        )}
        
        {isAdmin && (
          <>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onSubmit(true)}
              disabled={loading}
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Saving...' : 'Save Draft'}
            </Button>
            <Button 
              type="button" 
              onClick={() => onSubmit(false)}
              disabled={loading}
            >
              <Eye className="w-4 h-4 mr-2" />
              {loading ? 'Publishing...' : 'Create & Publish'}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default OpportunityFormActions;
