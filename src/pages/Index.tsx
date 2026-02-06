import React, { useState } from 'react';
import { WelcomeScreen } from './onboarding/WelcomeScreen';
import { RoleSelection } from './onboarding/RoleSelection';
import { AccountSetup } from './onboarding/AccountSetup';
import { ProductSelection } from './onboarding/ProductSelection';
import { AssetDetails } from './onboarding/AssetDetails';
import { RiskAssessmentScreen } from './onboarding/RiskAssessmentScreen';
import { UserDashboard } from './dashboard/UserDashboard';
import { useOnboarding } from '../hooks/useOnboarding';

type AppScreen = 
  | 'welcome'
  | 'role-selection'
  | 'account-setup'
  | 'product-selection'
  | 'asset-details'
  | 'risk-assessment'
  | 'dashboard';

const Index = () => {
  const [screen, setScreen] = useState<AppScreen>('welcome');
  const { data, updateData } = useOnboarding();

  const renderScreen = () => {
    switch (screen) {
      case 'welcome':
        return <WelcomeScreen onGetStarted={() => setScreen('role-selection')} />;
      
      case 'role-selection':
        return (
          <RoleSelection
            selectedRole={data.role}
            onSelect={(role) => updateData({ role })}
            onBack={() => setScreen('welcome')}
            onContinue={() => setScreen('account-setup')}
          />
        );
      
      case 'account-setup':
        return (
          <AccountSetup
            data={data}
            onUpdate={updateData}
            onBack={() => setScreen('role-selection')}
            onContinue={() => setScreen('product-selection')}
          />
        );
      
      case 'product-selection':
        return (
          <ProductSelection
            selectedProduct={data.selectedProduct}
            onSelect={(product) => updateData({ selectedProduct: product })}
            onBack={() => setScreen('account-setup')}
            onContinue={() => setScreen('asset-details')}
          />
        );
      
      case 'asset-details':
        return (
          <AssetDetails
            productType={data.selectedProduct || 'motor'}
            assetDetails={data.assetDetails}
            onUpdate={(details) => updateData({ assetDetails: details })}
            onBack={() => setScreen('product-selection')}
            onContinue={() => setScreen('risk-assessment')}
          />
        );
      
      case 'risk-assessment':
        return (
          <RiskAssessmentScreen
            onBack={() => setScreen('asset-details')}
            onProceed={() => setScreen('dashboard')}
          />
        );
      
      case 'dashboard':
        return (
          <UserDashboard
            onNewApplication={() => setScreen('product-selection')}
          />
        );
      
      default:
        return <WelcomeScreen onGetStarted={() => setScreen('role-selection')} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderScreen()}
    </div>
  );
};

export default Index;
