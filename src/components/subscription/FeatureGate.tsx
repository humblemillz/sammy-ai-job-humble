
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Zap, Star, CreditCard } from 'lucide-react';
import { useUserTier } from '@/hooks/useUserTier';
import { useFlutterwavePayment } from '@/hooks/useFlutterwavePayment';

interface FeatureGateProps {
  feature: string;
  description: string;
  children: React.ReactNode;
  showUpgrade?: boolean;
}

const FeatureGate: React.FC<FeatureGateProps> = ({
  feature,
  description,
  children,
  showUpgrade = true
}) => {
  const { hasProAccess, loading } = useUserTier();
  const { processPayment, isProcessing } = useFlutterwavePayment();

  if (loading) {
    return (
      <div className="animate-pulse bg-gray-200 rounded-lg h-32 flex items-center justify-center">
        <span className="text-gray-500">Loading...</span>
      </div>
    );
  }

  if (hasProAccess()) {
    return <>{children}</>;
  }

  if (!showUpgrade) {
    return null;
  }

  const handleUpgrade = async () => {
    await processPayment('pro', 5000);
  };

  return (
    <Card className="border-2 border-dashed border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-2">
          <Crown className="h-8 w-8 text-amber-500 mr-2" />
          <Badge variant="secondary" className="bg-amber-100 text-amber-800">
            Pro Feature
          </Badge>
        </div>
        <CardTitle className="text-xl text-gray-800">{feature}</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-gray-600">{description}</p>
        
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center">
            <Zap className="h-4 w-4 mr-1 text-amber-500" />
            Advanced AI Features
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 mr-1 text-amber-500" />
            Priority Support
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-lg font-semibold text-gray-800">Only ₦5,000/month</p>
          <Button 
            onClick={handleUpgrade}
            disabled={isProcessing}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-6 py-2"
          >
            <CreditCard className="h-4 w-4 mr-2" />
            {isProcessing ? 'Processing...' : 'Pay with Flutterwave'}
          </Button>
        </div>
        
        <p className="text-xs text-gray-400">
          Secure payment • Cancel anytime • 30-day money-back guarantee
        </p>
      </CardContent>
    </Card>
  );
};

export default FeatureGate;
